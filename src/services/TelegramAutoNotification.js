import { sendTelegramNotification } from './TelegramService';

class TelegramAutoNotification {
  constructor() {
    this.lastPostId = null;
    this.checkInterval = 5 * 60 * 1000; // 5 minutos
    this.isChecking = false;
  }

  startChecking = async (fetchPosts) => {
    if (this.isChecking) return;
    this.isChecking = true;

    try {
      // Busca posts iniciais
      const posts = await fetchPosts();
      if (posts && posts.length > 0) {
        this.lastPostId = posts[0]._id;
      }

      // Inicia verificação periódica
      setInterval(async () => {
        await this.checkNewPosts(fetchPosts);
      }, this.checkInterval);

      console.log('Verificação automática de posts iniciada');
    } catch (error) {
      console.error('Erro ao iniciar verificação automática:', error);
      this.isChecking = false;
    }
  };

  checkNewPosts = async (fetchPosts) => {
    try {
      const posts = await fetchPosts();
      if (!posts || posts.length === 0) return;

      const latestPost = posts[0];
      
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
  };

  stopChecking = () => {
    this.isChecking = false;
    this.lastPostId = null;
    console.log('Verificação automática de posts parada');
  };
}

export const telegramAutoNotification = new TelegramAutoNotification(); 