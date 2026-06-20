// frontend/src/services/chatApi.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000' || 'https://portfolio-ai-backend-zoxj.onrender.com';

export const chatApi = {
  async sendMessage(message, history = [], timeoutMs = 15000) {
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'bot' ? 'assistant' : msg.role,
      content: msg.content || msg.text || '',
    }));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: formattedHistory }),
        signal: controller.signal,
        mode: 'cors',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorDetail = `HTTP ${response.status}`;
        try {
          const errData = await response.json();
          errorDetail = errData?.detail || errData?.message || errorDetail;
        } catch {}
        throw new Error(errorDetail);
      }

      const data = await response.json();
      if (!data || typeof data !== 'object') throw new Error('Invalid JSON');
      if (data.status !== 'success') throw new Error(data.message || data.detail || 'Unknown error');
      if (!data.bot_response && data.bot_response !== '') throw new Error('Missing bot_response');

      return {
        status: data.status,
        bot_response: data.bot_response,
        model: data.model || 'llama',
      };
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') throw new Error('Request timed out');
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        throw new Error('CORS or network error – cannot reach backend');
      }
      throw error;
    }
  },

  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/`, { method: 'HEAD', cache: 'no-cache' });
      return res.ok;
    } catch {
      return false;
    }
  },
};