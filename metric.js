document.addEventListener("DOMContentLoaded" ,function (){
    const searchbutton=document.getElementById("Search");
    const username=document.getElementById("name");
    const statscontainer=document.querySelector("#stats");
    const easyprogress=document.querySelector(".first_progress");
    const mediumprogress=document.querySelector(".second_progress");
    const hardprogress=document.querySelector(".third_progress");
    const easylabel=document.getElementById("Easy_progress");
    const mediumlabel=document.getElementById("medium_progress");
    const hardlabel=document.getElementById("hard_progress");
    const cardstatscontainer=document.querySelector("#stats_card");

   function usernamevalidate(name){
    if(name.trim()===""){
        alert("username should not be empty");
        return false;
    }
    const regex= /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    const ismatching=regex.test(name);
    if(!ismatching){
        alert("Invalid username");
    }
    return ismatching;
   }
   async function fetchUserDetails(name) {
    const url=`https://leetcode-stats-api.herokuapp.com/${name}`
    try {
        // Disable search button
        searchbutton.textContent = "Searching...";
        searchbutton.disabled = true;
        const requestOptions={
            method :'GET',
            headers: {
                'Content-Type': 'application/json'
            }


        }
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error("Unable to fetch the user details");
        }

        
        const parsedata = await response.json();
        console.log("Data received:", parsedata);
        displayUserData(parsedata)

      
    } catch (e) {
        console.error("Error:", e);
        statscontainer.innerHTML = `<p>Error fetching data. Please try again.</p>`;
    } finally {
        
        searchbutton.textContent = "Search";
        searchbutton.disabled = false;
    }
   }
   function updateProgress(total,solved,label,circle){
    const progressDegree=(solved/total)*100;
    circle.style.setProperty("--progress-degree",`${progressDegree}%`)
    label.textContent=`${solved}/${total}`
   }
   function displayUserData(parsedata){
    const totalQues=parsedata.totalQuestions;
    const totalEasyQues=parsedata.totalEasy;
    const totalMediumQues=parsedata.totalMedium;
    const totalHardQues=parsedata.totalHard;

    const solvedTotalQues=parsedata.totalSolved;
    const solvedEasyQues=parsedata.easySolved;
    const solvedMediumQues=parsedata.mediumSolved;
    const solvedHardQues=parsedata.hardSolved;

    updateProgress(totalEasyQues,solvedEasyQues,easylabel,easyprogress);
    updateProgress(totalMediumQues,solvedMediumQues,mediumlabel,mediumprogress);
    updateProgress(totalHardQues,solvedHardQues,hardlabel,hardprogress);
   }

    searchbutton.addEventListener('click', function(){
        const name=username.value;
        if(usernamevalidate(name)){
            fetchUserDetails(name)

        }
    })

})

