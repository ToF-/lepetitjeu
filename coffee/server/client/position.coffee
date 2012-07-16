class @Position
	constructor: (data) ->
		@x = data.x
		@y = data.y

	isEqual: (position) =>
		@x is position.x and @y is position.y