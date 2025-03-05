import React, { useState } from 'react';
import { sendTelegramNotification } from '../services/TelegramService';

const TelegramNotification = ({ post }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    console.log('Botão Telegram clicado');
    console.log('Dados do post:', post);
    
    setIsLoading(true);
    try {
      console.log('Iniciando envio de notificação...');
      const success = await sendTelegramNotification(post);
      console.log('Resultado do envio:', success);
      
      if (success) {
        setIsSubscribed(true);
        alert('Notificação enviada com sucesso!');
      } else {
        alert('Erro ao enviar notificação. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no handleSubscribe:', error);
      alert('Erro ao enviar notificação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading || isSubscribed}
      className="telegram-notification-button"
      aria-label="Receber notificações no Telegram"
      style={{ cursor: isLoading || isSubscribed ? 'not-allowed' : 'pointer' }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className="telegram-icon"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.89.03-.25.37-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.14-.02.3-.03.42z"/>
      </svg>
      <span>
        {isLoading ? 'Enviando...' : isSubscribed ? 'Notificação Enviada!' : 'Receber no Telegram'}
      </span>
    </button>
  );
};

export default TelegramNotification; 