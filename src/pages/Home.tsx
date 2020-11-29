
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonSearchbar, IonRefresherContent, IonRefresher, IonRow, IonCol, IonGrid } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { RefresherEventDetail } from '@ionic/core';
import './home.css';



const Home: React.FC = () => {
  

    return (
<IonPage className="homep">
  <IonHeader>
    
  </IonHeader>

  <IonContent>
    <IonGrid>
    <IonRow class="ion-align-items-center">
      <IonCol class="ion-align-self-center">
        <div className="nscc">
        <img src="https://www.nscc.ca/img/fbgraph/default-nscc.jpg" alt="nscc logo"/>

        </div>
      
      </IonCol>
    
    </IonRow>
    </IonGrid>
 
  </IonContent>
</IonPage>
    );
};

export default Home;