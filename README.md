# Coina

<a href="https://coina.herokuapp.com"/>Try Coina</a>

## Introduction
Coina is a question forum for blockchain, crypto and web 3.0 enthusiasts to discuss their favorite thing. Coina is a spin-off of the popular web application Quora. 

![Alt Text](https://github.com/asabushaban/Coina/blob/main/react-app/public/wireframes/login:splash.png)

## Technologies Used

### Frontend
JavaScript | React | Redux
### Backend
Python | Flask | SQLAlchemy

## Features
### View Questions and Answers from everyone you follow on your landing page (Coina logo in navigation bar) or from those you follow (people icon navigation bar). 

![Alt Text](https://github.com/asabushaban/Coina/blob/main/react-app/public/wireframes/Home.png)

users can post new questions by clicking and the top white container that reads "what is your question?"

within each question container, users can upvote questions they like.

within each question container, the highest voted answer appers as the answer to the question.

within each question container, users can follow or unfollow other users who have answered a question posted by someone they follow.

users can click on a specific question to take them to that specific question page. There they can see all the answers and submit answers to that question (more details below).

### View Answers to a specific question. 

![Alt Text](https://github.com/asabushaban/Coina/blob/main/react-app/public/wireframes/Answers.png)

from this page a user can see a specific question and all the answers associated with it (/question/:questionId), a user can press the answer button and put their answer to the specified question in the text area that appears.

within each answer container, users can upvote answers they like.

within each answer container, if the user posted the specific answer, they can edit or delete their answer.

### View My Profile. 

![Alt Text](https://github.com/asabushaban/Coina/blob/main/react-app/public/wireframes/MyProfile.png)

users can press the profile button in the navigation bar (house) to be taken to their page. 

users can see how many followers/following they have, and the questions that they posted. 

users can edit/delete questions that they've posted. 

### View Other Users Profiles. 

![Alt Text](https://github.com/asabushaban/Coina/blob/main/react-app/public/wireframes/other-users-profile.png)

users can navigate to another users page and follow/unfollow them.

they can see all questions posted by the specific users and answer that users question by clicking on that question and being routed to the specific question page.
