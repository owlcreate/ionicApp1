import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonRefresher, IonRefresherContent, IonButtons, IonBackButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './tabs.css';
import DiplomaProgram from '../models/DiplomaProgram';
import { RefresherEventDetail } from '@ionic/core';



const DiplomaProgramsTab: React.FC = () => {


  //define the state for this component
  const [diplomaPrograms, setDiplomaPrograms] = useState<Array<DiplomaProgram>>([]);

   
  const getData = (callback: (data: any) => void) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    url = `https://nsccapi-w0275252-apim.azure-api.net/nscccoursemap-api-w0275252/diplomaprograms`
    //retrieve data from the api 
    fetch(proxyUrl + url)
    .then(response => response.json())
    .then(json => {
      callback(json)
    })

  }

    useEffect(() => {
      getData(data => {
        setDiplomaPrograms(data)
      })
    }, [])
   
  
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {

  
      getData(data => {
        setDiplomaPrograms(data)
        event.detail.complete() 
      })
    }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/"/>
          </IonButtons>
          <IonTitle>Diploma Programs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon="arrow-dropdown"
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing...">       
          </IonRefresherContent>
        </IonRefresher>
        <IonList>
        {
            diplomaPrograms.map((dp: any, index: number) => {
              return (
                  <IonItem 
                    href={`/diplomaprogram/${dp.Id}`}
                    key={index}>
                    {dp.Title}              
                  </IonItem>
              )
            })           
              
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DiplomaProgramsTab;
