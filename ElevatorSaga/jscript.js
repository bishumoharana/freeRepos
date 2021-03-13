{
    init: function(elevators, floors, floor) {
        console.clear();
        console.log('elevators:', elevators);
        console.log('floors:', floors);
        var elevator = elevators[0]; // Let's use the first elevator
        
        //elevator.goToFloor(0);
        //elevator.on("idle", function() {
            
           // elevator.goToFloor(Math.round(floors.length/2, 1));
            
        //});
        //elevator.on("floor_button_pressed", function(floorNum) { 
        //    elevator.goToFloor(floorNum);
        //} );
        //_.each(floors, (floor)=> {
        //    floor.on("up_button_pressed down_button_pressed", () => {
        //        //elevator.goToFloor(floor.level);
        //        _.each(elevators, (elevator)=> {
        //            elevator.on("idle", function() {
        //                elevator.goToFloor(floor.level);
        //            });
        //            //elevator.goToFloor(floor.level);
        //        });
        //    });
        //});
        _.each(elevators, (elevator)=> {
            _.each(floors, (floor)=> {
                floor.on("up_button_pressed down_button_pressed", () => {
                    //_.each(elevators, (elevator)=> {
                    var before = elevator.destinationQueue;
                        elevator.on("idle", function() {
                            elevator.goToFloor(floor.level);
                        });
                    var after = elevator.destinationQueue;
                    if (after != before){
                        return;
                    }
                    //});
                });
            });
            elevator.on("idle", () => {
                elevator.goToFloor(0);
            });
            //elevator.on("floor_button_pressed", function(floorNum) { 
            //    console.log(elevator.destinationQueue);
            //    elevator.goToFloor(floorNum);
            //} );
            elevator.on("floor_button_pressed", function(floorNum) { 
                console.log(elevator.destinationQueue);
                elevator.destinationQueue = [...new Set(elevator.destinationQueue)];
                elevator.destinationQueue = elevator.destinationQueue.sort((a, b) => {
                    return Math.abs(elevator.currentFloor - a) - Math.abs(elevator.currentFloor - b);
                })
                console.log("destinationQueue_Changed",elevator.destinationQueue);
                elevator.goToFloor(floorNum);
            } );
        });
        
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}