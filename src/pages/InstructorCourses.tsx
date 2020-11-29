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

interface InstructorCoursesPageProps extends RouteComponentProps<{
  id: string;
}> {}

const InstructorCourses: React.FC<InstructorCoursesPageProps> = ({match}) => {

  //define the state for this component
  const [instructorDetail, setInstructorDetail] = useState<any>({});

  const getData = (callback: (data: any) => void) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    url = `https://nsccapi-w0275252-apim.azure-api.net/nscccoursemap-api-w0275252/instructor/${match.params.id}`

    //retrieve data from the api 
    fetch(proxyUrl + url)
    .then(response => response.json())
    .then(json => {
      callback(json)
    })

  }



    useEffect(() => {
      getData(data => {
        setInstructorDetail(data)
      })
    }, [])
   
  
    const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
      console.log('Begin async operation');
  
      getData(data => {
        setInstructorDetail(data)
        event.detail.complete() //stops the spinner
      })
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/instructors"/>
          </IonButtons>
         <IonTitle> Course Taught by {instructorDetail.FirstName} {instructorDetail.LastName}</IonTitle>
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
            instructorDetail.CoursesTaught ? instructorDetail.CoursesTaught.map((ct: any, index: any) => {
              return (
                  <IonItem
                 
                    detail={true}
                    key={index}>
                    {ct.Title}
                    
                  </IonItem>
              )
            }) : ''
          }
        
    </IonList>
        
   
      </IonContent>
    </IonPage>
  );
};

export default InstructorCourses;
