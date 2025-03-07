import { sendTelegramNotification } from './TelegramService';
import { getPosts } from './api';

class TelegramAutoNotification {
  constructor() {
    this.lastPostId = null;
    this.checkInterval = 5 * 60 * 1000; // 5 minutos
    this.isChecking = false;
    this.intervalId = null;
    
    // Vincula os métodos ao contexto da classe
    this.startChecking = this.startChecking.bind(this);
    this.checkNewPosts = this.checkNewPosts.bind(this);
    this.stopChecking = this.stopChecking.bind(this);
  }

  async startChecking() {
    if (this.isChecking) return;
    this.isChecking = true;

    try {
      // Busca posts iniciais
      const response = await getPosts(1);
      if (response && response.posts && response.posts.length > 0) {
        this.lastPostId = response.posts[0]._id;
      }

      // Inicia verificação periódica
      this.intervalId = setInterval(async () => {
        await this.checkNewPosts();
      }, this.checkInterval);

      console.log('Verificação automática de posts iniciada');
    } catch (error) {
      console.error('Erro ao iniciar verificação automática:', error);
      this.isChecking = false;
    }
  }

  async checkNewPosts() {
    try {
      const response = await getPosts(1);
      if (!response || !response.posts || response.posts.length === 0) return;

      const latestPost = response.posts[0];
      
      // Se não temos um último post registrado, registra este
      if (!this.lastPostId) {
        this.lastPostId = latestPost._id;
        return;
      }

      // Se encontrou um post mais recente
      if (latestPost._id !== this.lastPostId) {
        console.log('Novo post encontrado! Enviando notificação...');
        await sendTelegramNotification(latestPost);
        this.lastPostId = latestPost._id;
      }
    } catch (error) {
      console.error('Erro ao verificar novos posts:', error);
    }
  }

  stopChecking() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isChecking = false;
    this.lastPostId = null;
    console.log('Verificação automática de posts parada');
  }
}

export const telegramAutoNotification = new TelegramAutoNotification(); 