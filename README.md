<h1> Medication Reminder App</h1>
<h4> Generate notification reminders to take a medication at specific frequency every day/week/month based on user inputs
 
This project is fullstack built with react for frontend, MUI for styling, node.js for backend and MYSQL for database. </h4>

 <h2> Technologies </h2>

| **Tech** | **Description** |
|----------|-------|
|  [React](https://facebook.github.io/react/)  |   Javascript framework   |
|  [context](https://legacy.reactjs.org/docs/context.html)  |   Application state management for react    |
|  [Node.js](https://nodejs.org/en)  |   Server framework for Node   |
|  [MYSQL](https://www.mysql.com/)  |   SQL database    |

 
 <h2> Database </h2>
 
 ![image](https://user-images.githubusercontent.com/38782963/232235033-79a7853c-9eb9-4dfe-9660-f15d9d1d18ee.png)

 <h2> API  </h2>
 <h5> AUTHENTICATION </h5>
 <ul>
  <li>  POST /api/signup  :: user signup [first name, end name, email, password]</li>
  <li>  POST /api/login   :: user login[email,password] </li>
  <li>  POST /api/signout :: user logout</li>
</ul>
 
  <h5> USER ENDPOINTS </h5>
 <ul>
  <li> GET /api/user/:id  :: Fetch user information for profile </li>
  <li> PUT /api/users/:id :: update user information</li>
</ul>  
 
  <h5> MEDICINE ENDPOINTS </h5>
  <ul>
  <li> GET /api/medicine/:user_id  :: Fetch all medecines for specefic user</li>
  <li> POST /api/medicine/:user_id :: Add medicine for specific user</li>
  <li> DELETE /api/medicine/:id    :: Delete medicine by its id</li>
</ul>  
 
 <h5> REMINDER ENDPOINTS </h5>
 <ul>
  <li> GET /api/reminder/:user_id  :: Fetch all reminders for specefic user</li>
  <li> POST /api/reminder/add :: Add reminder for specific user</li>
  <li> DELETE /api/reminder/:id    :: Delete reminder by its id</li>
</ul>  
 
 <h5> REMINDER ENDPOINTS </h5>
 <ul>
  <li> GET /api/notification/count/:userId         :: Count number of unread notification for specefic user</li>
  <li> GET  /api/notification/all/:userId          :: Get all notifications(read and unread) for specefic user</li>
  <li> GET /api/notification/:userId               :: Get unread notifications for specefic user</li>
  <li> PUT /api/notification/read/:notificationId/ :: Update notification satus to read</li>
  <li> POST /api/notification/add :: Add notification for specific user</li>
  <li> DELETE /api/notification/reminder/:reminder_id    :: Delete all notifications related to specefic reminder by  reminder id</li>
</ul>  
 
 
<h2> Features </h2>
The app allows user to signup and login

![image](https://user-images.githubusercontent.com/38782963/232232225-2885e6da-fc19-4bce-a1cd-8cbfb9473f7f.png)

![image](https://user-images.githubusercontent.com/38782963/232232276-10edf3bc-b959-4fa5-b7fa-1c7116bef53e.png)

User can add medicine by adding medicine name
![image](https://user-images.githubusercontent.com/38782963/232232508-dffcb03f-17d3-485e-8ccc-ff278fc6b022.png)

 User can create reminder by select medicine {dropdown}, Dosage, Repetition{Daily,Weekly,Monthly}, fregency{How many time at repetition}, Start Date, End Date, Time, Note
![image](https://user-images.githubusercontent.com/38782963/232232729-04a7b8a6-bf35-4d42-a041-50e2ec988667.png)

User will recieve a notification to take the medicine. He can mark the notification as read if click on the notification
![image](https://user-images.githubusercontent.com/38782963/232232906-cdb826f6-b887-41ff-b0c6-6b4aea8e601d.png)

In home, there is dashboard to display all reimnders that the user created them, user can add new reminder, delete and edit reminder.
![image](https://user-images.githubusercontent.com/38782963/232232973-c71f60e7-8e4a-4a7c-b251-0e196c8dee8d.png)

In home, user can show all medicines he has. He can delete, edit and add new medicine.
![image](https://user-images.githubusercontent.com/38782963/232233065-ac7a3e9d-a247-441e-bf17-fb88268f0831.png)

In home, user can show all his notificatoin with the status (read and unread notifications).
![image](https://user-images.githubusercontent.com/38782963/232233154-cb067f7a-5aa2-4a3c-8d40-d18e9d94d6f6.png)

In home, user can go to his profile and edit 

![image](https://user-images.githubusercontent.com/38782963/232233196-c17fabcd-7c3b-4196-b642-9ed846313ee0.png)

In home user can logout.
In the navbar user can go to his profile and logout.

![image](https://user-images.githubusercontent.com/38782963/232233243-c6f08b84-8a7c-4273-9afb-56aa04e9254c.png)





