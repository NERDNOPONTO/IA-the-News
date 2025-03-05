const TELEGRAM_BOT_TOKEN = '8079747717:AAEmLp7Ec7kq2I8df1gwf2gJPtm58al3-Mk'; // Substitua pelo seu token
const TELEGRAM_CHAT_ID = '2035853836'; // Substitua pelo número do seu chat ID

export const sendTelegramNotification = async (post) => {
  try {
    console.log('Iniciando envio de notificação para o Telegram...');
    
    const message = `
🆕 Nova Postagem!

📝 ${post.title}

📅 Publicado em: ${new Date(post.createdAt).toLocaleDateString('pt-BR')}

🔗 Link: ${window.location.origin}/post/${post._id}

📋 Resumo:
${post.content.substring(0, 200)}...
    `;

    console.log('Mensagem preparada:', message);

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    console.log('URL da API:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const responseData = await response.json();
    console.log('Resposta da API:', responseData);

    if (!response.ok) {
      console.error('Erro detalhado:', responseData);
      throw new Error(`Erro ao enviar notificação: ${responseData.description || 'Erro desconhecido'}`);
    }

    console.log('Notificação enviada com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao enviar notificação do Telegram:', error);
    return false;
  }
};