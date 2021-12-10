# GEOG 495 Final Project
## Nearest Starbucks and consideration on passenger flow


#### Application URL:

stephenwzy.github.io/final_project/index.html
#### Project Description:

The project is designed as an interactive map application that contain one main page and two sub pages. The application shows the distribution of Starbucks coffee shops in Seattle City. The application will sort out the nearest Starbucks based on the geographic locations (nominal locations) provided by users in the search bar. On the index page (home page), the app provides two buttons. The first one directs to "Visualization of raw visits", which displays the pattern of the sum of raw visits in each Starbucks from 2021/10/1 - 2021/11/1. The second one directs to "Visualization of dwelling time", which diaplays the pattern of visitors' median dwelling time in each Starbucks.

![Application](assets/app.png)

#### Data Source and Data Operation:

The data used in this application is downloaded from [SafeGraph]('www.safegraph.com') which is a company offering data of points of Interests (POI). SafeGraph obtains GPS data by regularly pinging 18 million smartphones with certain apps each day. In this way, we are able to use passengers' mobile phone as a medium to monitor the specific POI data of Starbucks.

SafeGraph provides multiple types of datasets. In this application, I downloaded "Core Places" .csv file, which contains basic information of each Starbucks, including the geographic coordinates. I also downloaded "Patterns" .csv file, which contians various types of POI data. I used Rstudio to merge two .csv by the column "street_address" and get a dataset containing both patterns and geographic coordinates. Then I used QGIS to convert the .csv file to a .geojson file that I can load in javascript.

#### Project Goal:

This is a relatively daily map application. It is trying to allow users to make a comprehensive consideration of geographic distance, passenger flow, and passenger dwelling time. Especially in the context of a pandemic, such consideration became more important. Eventhough it is impossible to capture the real-time passenger flow data, based on the POI data in the previous month, a pattern of passenger flow information can be roughly inferred.

#### Screenshots
Sum of raw visits from 2021/10/1 to 2021/11/1: 
![raw visits](assets/visits.png)
Median of dwelling time of all visits from 2021/10/1 to 2021/11/1:
![dwelling](assets/dwelling.png)

#### Applied Libraries and Web Services
1. Mapbox GL js
2. Turf
3. Github
4. Google fonts
5. Mapbox Studio

