import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonList, IonRefresher, IonRefresherContent, IonButtons, IonBackButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './tabs.css';
import AcademicYear from '../models/AcademicYear';
import { RefresherEventDetail } from '@ionic/core';

const AcademicYearsTab: React.FC = () => {


  //have the two academic years show and be clickable
  //when academic years is chosen then take it to the semesters tab

  //define the state for this component
  const [academicYears, setAcademicYears] = useState<Array<AcademicYear>>([]);

  const getData = (callback: (data: any) => void) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    url = `https://nsccapi-w0275252-apim.azure-api.net/nscccoursemap-api-w0275252/academicyears`
    //retrieve data from the api 
    fetch(proxyUrl + url)
    .then(response => response.json())
    .then(json => {
      callback(json)
    })

  }

    useEffect(() => {
      getData(data => {
        setAcademicYears(data)
      })
    }, [])
   
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {

      getData(data => {
        setAcademicYears(data)
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
          <IonTitle>Academic Years</IonTitle>
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
            academicYears.map((ay: any, index: number) => {
              return (
                  <IonItem 
                    href={`/academicyear/${ay.Id}`}
                    key={index}>
                    {ay.Title}              
                  </IonItem>
              )
            })           
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AcademicYearsTab;
