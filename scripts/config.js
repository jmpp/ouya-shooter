define({
	TIMING : 0,
	FRAME : 0,
	LEVEL : 0,
	
	player_life : 100,
	player_blink_time : 1500,
	time_between_waves : 5000,

	levels : [
		{
			score_gain : 100,
			enemies_total : 20,
			enemies_onscreen : 4,
			player_additional_life : 100,
			enemies_damage : 10,
			enemy_min_speed : 1,
			enemy_max_speed : 3
		},
		{
			score_gain : 150,
			enemies_total : 20,
			enemies_onscreen : 10,
			player_additional_life : 50,
			enemies_damage : 20,
			enemy_min_speed : 1,
			enemy_max_speed : 1
		},
		{
			score_gain : 200,
			enemies_total : 15,
			enemies_onscreen : 5,
			player_additional_life : 50,
			enemies_damage : 30,
			enemy_min_speed : 2,
			enemy_max_speed : 4
		},
		{
			score_gain : 300,
			enemies_total : 30,
			enemies_onscreen : 5,
			player_additional_life : 25,
			enemies_damage : 20,
			enemy_min_speed : 3,
			enemy_max_speed : 5
		},
		{
			score_gain : 400,
			enemies_total : 30,
			enemies_onscreen : 2,
			player_additional_life : 100,
			enemies_damage : 30,
			enemy_min_speed : 8,
			enemy_max_speed : 10
		},
		{
			score_gain : 500,
			enemies_total : 50,
			enemies_onscreen : 4,
			player_additional_life : 50,
			enemies_damage : 20,
			enemy_min_speed : 1,
			enemy_max_speed : 10
		}
	]
});