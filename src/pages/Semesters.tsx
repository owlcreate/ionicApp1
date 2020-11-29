import React, { useState, useEffect } from 'react';
import { IonContent, 
         IonHeader, 
         IonPage, 
         IonTitle, 
         IonToolbar,
         IonList,
         IonLabel,
         IonItem,
         IonRefresher,
         IonRefresherContent,
         IonButtons,
         IonBackButton,
    
        } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './tabs.css';
import { RouteComponentProps } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';
import AcademicYearsTab from './AcademicYearsTab';

interface SemestersPageProps extends RouteComponentProps<{
  id: string;
}> {}

const Semesters: React.FC<SemestersPageProps> = ({match}) => {

  //define the state for this component
  const [semesterDetail, setSemesterDetail] = useState<any>({});


  const getData = (callback: (data: any) => void) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    url = `https://nsccapi-w0275252-apim.azure-api.net/nscccoursemap-api-w0275252/academicyear/${match.params.id}`
    //retrieve data from the api 
    fetch(proxyUrl + url)
    .then(response => response.json())
    .then(json => {
      callback(json)
    })

  }

  useEffect(() => {
    getData(data => {
      setSemesterDetail(data)
    })
  }, [])
   
  
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
  
      getData(data => {
        setSemesterDetail(data)
        event.detail.complete() 
      })
    }


  return (
    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/academicyears"/>
          </IonButtons>
          <IonTitle>Semesters</IonTitle>
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
            semesterDetail.Semester ? semesterDetail.Semester.map((sem: any, index: any) => {
              return (
                  <IonItem
                  href={`/coursestaught/${semesterDetail.Id}`}
                    detail={true}
                    key={index}>
                    {sem.Name}
                    
                  </IonItem>
              )
            }) : ''
          }
        
    </IonList>
        
   
      </IonContent>
    </IonPage>
  );
};

export default Semesters;
