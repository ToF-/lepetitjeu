class @Position
	constructor: (data) ->

		if(data instanceof Array)
			@x = data[0]
			@y = data[1]
		else
			@x = data.x
			@y = data.y
		
	isEqual: (position) =>
		if(position instanceof Array)
			@x is position[0] and @y is position[1]
		else
			@x is position.x and @y is position.y
