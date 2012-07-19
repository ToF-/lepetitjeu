class @Position
	constructor: (data) ->

		if(data instanceof Array)
			@x = data[0]
			@y = data[1]
		else
			@x = data.x
			@y = data.y
		
	isEqual: (position) =>
		@x is position.x and @y is position.y