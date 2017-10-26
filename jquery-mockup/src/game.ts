import * as $ from 'jquery';

export class Ex {
    name: string
}

export class ExComplete {
    name: string
}

/*let myex: Ex = {name: "Bench Press" }
let exArr: Ex[] = [
    { name: "Running" },
    { name: "Swimming"}
] */

export class ActivityManager {
    exercises: Ex[] = [];
    completed_exercises: ExComplete[] = [];

    init() {     //everything inside .when being sent to client
        return $.when(
            $.getJSON("/ExerciseLog/exercises").done( data =>{
                this.exercises = data;
            }),
            $.getJSON("/ExerciseLog/exercises_complete").done( data =>{
                this.completed_exercises = data;
            })
        );
    }

    /*my-exercises-completed*/
    displayExercises(){
        $("#my-exercises").html(
            this.exercises.map( x => `<a class="list-group-item list-group-item-action">${x.name}</a>` ).join("")
        );  
    }
    displayExercisesComplete(){
        $("#my-exercises-completed").html(
            this.completed_exercises.map( x => `<a class="list-group-item list-group-item-action">${x.name}</a>` ).join("")
        );  
    }
}


// Controller
const activities = new ActivityManager();
var i = 0;

activities.init().done(()=>{
    

    activities.displayExercises();
    activities.displayExercisesComplete();
    //get the parent div, get children, each function

    /*jQuery function to handle the exercise-log lists */
});


