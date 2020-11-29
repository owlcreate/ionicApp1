import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonSearchbar, IonRefresherContent, IonRefresher, IonButtons, IonBackButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { RefresherEventDetail } from '@ionic/core';
import './tabs.css';

import Instructor from '../models/Instructor';


const InstructorsTab: React.FC = () => {


  //define the state for this component
  const [instructors, setInstructor] = useState<Array<Instructor>>([]);

  const getData = (callback: (data: any) => void) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    url = `https://nsccapi-w0275252-apim.azure-api.net/nscccoursemap-api-w0275252/instructors`
    //retrieve data from the api 
    fetch(proxyUrl + url)
    .then(response => response.json())
    .then(json => {
      callback(json)
    })

  }
    useEffect(() => {
      getData(data => {
        setInstructor(data)
      })
    }, [])
   
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
  
      getData(data => {
        setInstructor(data)
        event.detail.complete() //stops the spinner
      })
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/"/>
          </IonButtons>
          <IonTitle>Instructor</IonTitle>
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
         instructors
            .map((instructor: any, index: number) => {
              return (
                  <IonItem 
                  href={`/instructor/${instructor.Id}`}
                    key={index}>
                    {instructor.FirstName} {instructor.LastName}             
                  </IonItem>
              )
            })
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default InstructorsTab;
