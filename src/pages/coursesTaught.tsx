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
    
        } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { RefresherEventDetail } from '@ionic/core';
import './tabs.css';
import { RouteComponentProps } from 'react-router';

interface CoursesTaughtPageProps extends RouteComponentProps<{
  id: string;
}> {}

const CoursesTaught: React.FC<CoursesTaughtPageProps> = ({match}) => {

  //define the state for this component
  const [courseTaughtDetail, setCourseTaughtDetail] = useState<any>({});

  const getData = (callback: (data: any) => void) => {

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    url = `https://nsccapi-w0275252-apim.azure-api.net/nscccoursemap-api-w0275252/semester/${match.params.id}`

    fetch(proxyUrl + url)
    .then(response => response.json())
    .then(json => {
      callback(json)
    })

  }
    useEffect(() => {
      getData(data => {
        setCourseTaughtDetail(data)
      })
    }, [])
   
  
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    
      getData(data => {
        setCourseTaughtDetail(data)
        event.detail.complete() //stops the spinner
      })
    }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
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
            courseTaughtDetail.CoursesTaught ? courseTaughtDetail.CoursesTaught.map((ct: any, index: any) => {
              return (
                  <IonItem
                 
                    detail={true}
                    key={index}>
                    {ct.CourseCode}
                    
                  </IonItem>
              )
            }) : ''
          }
        
    </IonList>
        
   
      </IonContent>
    </IonPage>
  );
};

export default CoursesTaught;
