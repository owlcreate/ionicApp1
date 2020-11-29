import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, flask, library, calendar, school, home} from 'ionicons/icons';
import Tab1 from './pages/AcademicYearsTab';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AcademicYearsTab from './pages/AcademicYearsTab';

// import CoursesTaughtTab from './pages/CoursesTaughtTab';
import CoursesTab from './pages/CoursesTab';
import DiplomaProgramsTab from './pages/DiplomaProgramsTab';
import AcademicAdvisors from './pages/AcademicAdvisors';
import CourseDetails from './pages/CourseDetails';
import Semesters from './pages/Semesters';
import CoursesTaught from './pages/coursesTaught';

import InstructorsTab from './pages/InstructorsTab';
import InstructorCourses from './pages/InstructorCourses';
import Home from './pages/Home';



const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
      
          <Route path="/academicyears" component={AcademicYearsTab} exact={true} />
          <Route path="/academicyear/:id" component={Semesters} exact={true} />
          <Route path="/coursestaught/:id" component={CoursesTaught} exact={true} />
          
          <Route path="/courses" component={CoursesTab} exact={true} />
          <Route path="/courses/:id" component={CourseDetails} exact={true} />

          <Route path="/diplomaprograms" component={DiplomaProgramsTab} exact={true} />
          <Route path="/diplomaprogram/:id" component={AcademicAdvisors} exact={true} />

          <Route path="/instructors" component={InstructorsTab} exact={true} />
          <Route path="/instructor/:id" component={InstructorCourses} exact={true} />

          <Route path="/home" component={Home} exact={true} />

          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="AcademicYearsTab" href="/academicyears">
            <IonIcon icon={calendar} />
            <IonLabel>Academic Years</IonLabel>
          </IonTabButton>
          <IonTabButton tab="CoursesTab" href="/courses">
            <IonIcon icon={flask} />
            <IonLabel>Courses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="DiplomaProgramsTab" href="/diplomaprograms">
            <IonIcon icon={library} />
            <IonLabel>Diploma Programs</IonLabel>
          </IonTabButton>
          <IonTabButton tab="InstructorsTab" href="/instructors">
            <IonIcon icon={school} />
            <IonLabel>Instructors</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
