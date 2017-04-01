/* 
	Example PlayFab Cloud Script weith examples which correspond to each photon webhook callback:
		1) RoomCreated
		2) RoomClosed
		3) RoomEventRaised
		4) RoomPropertyUpdated
		5) RoomJoined
		6) RoomLeft
*/

// Called in response to OpCreateRoom calls from the phton turnbased API
handlers.RoomCreated = function(args)
{
	var stats = server.GetUserStatistics({"PlayFabId" : currentPlayerId});
	var roomCreatedEventRaised = parseInt(stats.UserStatistics.roomCreatedEventRaised !== undefined ? stats.UserStatistics.roomCreatedEventRaised : 0);

	// write player stats to increment event counters
	server.UpdateUserStatistics({"PlayFabId" : currentPlayerId, "UserStatistics" : {
		"roomCreatedEventRaised" : roomCreatedEventRaised + 1,
		} 
	});	

	handlers.RoomJoined(args);
}

// Called after a room has lost all  players and terminates
handlers.RoomClosed = function(args)
{
	var stats = server.GetUserStatistics({"PlayFabId" : currentPlayerId});
	var roomClosedEventRaised = parseInt(stats.UserStatistics.roomClosedEventRaised !== undefined ? stats.UserStatistics.roomClosedEventRaised : 0);

	// write player stats to increment event counters
	server.UpdateUserStatistics({"PlayFabId" : currentPlayerId, "UserStatistics" : {
		"roomClosedEventRaised" : roomClosedEventRaised + 1,
		} 
	});	
}

// Called in response to generic OpRaisEvent calls
handlers.RoomEventRaised = function(args)
{
    var stats = server.GetUserStatistics({"PlayFabId" : currentPlayerId});
    if(!isObjectEmpty(args.Data))
    {
		if(args.Data.eventType !== undefined)
	    {
	    	// process events with the exp eventType
	    	if(args.Data.eventType === "exp")
	    	{
				// write player stats to increment event counters
				var experiencePoints = parseInt(stats.UserStatistics.ExperiencePoints !== undefined ? stats.UserStatistics.ExperiencePoints : 0);

				var exp = parseInt(args.Data.amt !== undefined ? args.Data.amt : 0);

				// write player stats to increment event counters
				server.UpdateUserStatistics({"PlayFabId" : currentPlayerId, "UserStatistics" : {
					"ExperiencePoints" : experiencePoints + exp,
					} 
				});	
	    	}
	    	// process events with the mvp eventType
			else if(args.Data.eventType === "mvp")
			{
				var mVPsWonCount = parseInt(stats.UserStatistics.MVPsWonCount !== undefined ? stats.UserStatistics.MVPsWonCount : 0);

				// write player stats to increment event counters
				server.UpdateUserStatistics({"PlayFabId" : currentPlayerId, "UserStatistics" : {
					"MVPsWonCount" : mVPsWonCount + 1,
					} 
				});	
			}
	    }
	}
 	 // /  CustomEventsRaised
	var CustomEventsRaised = parseInt(stats.UserStatistics.CustomEventsRaised !== undefined ? stats.UserStatistics.CustomEventsRaised : 0);

	// write player stats to increment event counters
	server.UpdateUserStatistics({"PlayFabId" : currentPlayerId, "UserStatistics" : {
		"CustomEventsRaised" : CustomEventsRaised + 1,
		} 
	});	

}

// Called in response to OpSetCustomPropertiesOfRoom 
handlers.RoomPropertyUpdated = function(args)
{
	var stats = server.GetUserStatistics({"PlayFabId" : currentPlayerId});
	var roomPropertyUpdatedEventRaised = parseInt(stats.UserStatistics.roomPropertyUpdatedEventRaised !== undefined ? stats.UserStatistics.roomPropertyUpdatedEventRaised : 0);

	// write player stats to increment event counters
	server.UpdateUserStatistics({"PlayFabId" : currentPlayerId, "UserStatistics" : {
		"roomPropertyUpdatedEventRaised" : roomPropertyUpdatedEventRaised + 1,
		} 
	});	
}

// Called in response to OpJoinRoom (not triggered by the room)
handlers.RoomJoined = function(args)
{
	var stats = server.GetUserStatistics({"PlayFabId" : currentPlayerId});
	var redTeamJoinedCount = parseInt(stats.UserStatistics.RedTeamJoinedCount !== undefined ? stats.UserStatistics.RedTeamJoinedCount : 0);
	var bluTeamJoinedCount = parseInt(stats.UserStatistics.BluTeamJoinedCount !== undefined ? stats.UserStatistics.BluTeamJoinedCount : 0);

	// randomly pick a team
	var team = (Math.random() * (100 - 1) + 1) > 50 ? "Red" : "Blu";

	// write player stats to increment event counters
	if(team === "Red")
	{
		server.UpdateUserStatistics({"PlayFabId" : currentPlayerId, "UserStatistics" : { "RedTeamJoinedCount" : redTeamJoinedCount + 1 } });	
	}
	if(team === "Blu")
	{
		server.UpdateUserStatistics({"PlayFabId" : currentPlayerId, "UserStatistics" : { "BluTeamJoinedCount" : bluTeamJoinedCount + 1 } });	
	}
}

// Called in response to OpLeaveRoom
handlers.RoomLeft = function(args)
{
	var stats = server.GetUserStatistics({"PlayFabId" : currentPlayerId});
	var roomLeftEventsRaised = parseInt(stats.UserStatistics.roomLeftEventsRaised !== undefined ? stats.UserStatistics.roomLeftEventsRaised : 0);

	// write player stats to increment event counters
	server.UpdateUserStatistics({"PlayFabId" : currentPlayerId, "UserStatistics" : {
		"roomLeftEventsRaised" : roomLeftEventsRaised + 1,
		} 
	});	
}


// checks to see if an object has any properties
// Returns true for empty objects and false for non-empty objects
function isObjectEmpty(obj)
{
	if(typeof obj === 'undefined')
	{
		return true;
	}

	if(Object.getOwnPropertyNames(obj).length === 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

// Placeholder to prevent Photon Error
handlers.GetGameList = function(args)
{
	return { "" : "" };
}


