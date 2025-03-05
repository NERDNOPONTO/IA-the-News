import React from 'react';

const AdSpace = ({ position = 'top' }) => {
  return (
    <div className={`ad-space ad-space-${position}`}>
      <div className="ad-container">
        {/* Área para anúncio do Google AdSense */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-SEU_ID_AQUI"
          data-ad-slot="SEU_SLOT_AQUI"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      <div className="ad-label">Publicidade</div>
    </div>
  );
};

export default AdSpace; 