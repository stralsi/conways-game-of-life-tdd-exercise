Universe = function(initialState){
	//var _currentGeneration = copyCells(initialState);
	var _neighbourMap = new NeighbourMap(initialState);
	var _liveCellMap = buildLiveCellMap(initialState);

	this.tick = function(){
		 var newGeneration = _liveCellMap.clone();
		 console.log("_liveCellMap:"+_liveCellMap.getAll());

		 var allLiveCells = _liveCellMap.getAll();

		 //live cells with less than 2 or more than 3 neighbours will die
		 var i;
		 var cell;
		 for(i = 0; i<allLiveCells.length;i++){
		 	cell = allLiveCells[i];

		 	var neighbourCount = _neighbourMap.getNeighbourCount(cell[0],cell[1]);

			if(neighbourCount < 2 || neighbourCount > 3){
				//kill it
				newGeneration.kill(cell[0],cell[1]);
			}
		 }

		 //dead cells with exactly 3 neighbours come to life
		 var cellsWithThreeNeighbours = _neighbourMap.getAllCellsWithNumNeighbours(3);
		 //console.log("number of cells with 3 neighbours:"+cellsWithThreeNeighbours.length);
		 for(i = 0;i<cellsWithThreeNeighbours.length;i++){
		 	cell = cellsWithThreeNeighbours[i];
		 	newGeneration.set(cell[0],cell[1],1);
		 }

		 //console.log("_liveCellMap:"+_liveCellMap.getAll());
		 _liveCellMap = newGeneration;
		 _neighbourMap = new NeighbourMap(newGeneration.getAll());		 
	}

	this.getNeighbourCount = function(x,y){
		return _neighbourMap.getNeighbourCount(x,y);
	}

	this.hasLife = function(x,y){
		return (_liveCellMap.get(x,y) > 0);
	}

	function buildLiveCellMap(liveCellArray){
		var result = new CellMap();
		for(var i = 0;i<liveCellArray.length;i++){
			var liveCell = liveCellArray[i];
			result.set(liveCell[0],liveCell[1],1);
		}
		return result;
	}
}



CellMap = function(){
	
	var _value = new Array();
	
	this.set = function(x,y,v){
		if(_value[x] == null) _value[x] = new Object();
		if(_value[x][y] == null) _value[x][y] = new Object();

		_value[x][y] = v;
	}

	this.get = function(x,y){
		if(_value[x] == null) return null;
		if(_value[x][y] == null) return null;

		return _value[x][y];
	}

	this.kill = function(x,y){
		if(_value[x] == null) return;
		if(_value[x][y] == null) return
		var xObj = _value[x];
		
		delete xObj[y];

		var remainingCellsOnSameXCoordinate = Object.keys(xObj).length
		if(remainingCellsOnSameXCoordinate == 0){
			delete _value[x]
		}
	}

	this.getByValue = function(v){
		var result = new Array();
		for(var x in _value){
			for(var y in _value[x]){
				if(_value[x][y] == v){
					result.push([x,y]);
				}
			}
		}
		return result;
	}

	this.getAll = function(){
		var result = new Array();
		for(var x in _value){
			for(var y in _value[x]){
				result.push([x,y,_value[x][y]]);
			}
		}
		return result;		
	}

	this.clone = function(){
		var newMap = new CellMap();
		for(var x in _value){
			for(var y in _value[x]){
				newMap.set(x,y,_value[x][y])
			}
		}
		return newMap;
	}
}

NeighbourMap = function(liveCells){
	
	var _internalCellMap = new CellMap();
	
	for(var i=0;i<liveCells.length;i++){
		var cell = liveCells[i];
		var x = Number(cell[0]);
		var y = Number(cell[1]);

		//increase neighbour count for all the live cell's neighbours
		increaseNeighbourCount(x+1,y);
		increaseNeighbourCount(x+1,y+1);
		increaseNeighbourCount(x,y+1);
		increaseNeighbourCount(x-1,y+1);
		increaseNeighbourCount(x-1,y);
		increaseNeighbourCount(x-1,y-1);
		increaseNeighbourCount(x,y-1);
		increaseNeighbourCount(x+1,y-1);
	}

	function increaseNeighbourCount(x,y){
		var previousValue = _internalCellMap.get(x,y);
		var newValue = previousValue == null?1:previousValue+1;
		_internalCellMap.set(x,y,newValue);
	}

 	this.getAllCellsWithNumNeighbours = function(num){
 		return _internalCellMap.getByValue(num);
 	}
 	this.getNeighbourCount = function(x,y){
 		var neighbours = _internalCellMap.get(x,y);
 		if(neighbours == null) return 0;
 		return neighbours;
 	}
 	this.getAll = function(){
 		return _internalCellMap.getAll();
 	}
}

function copyCells(cells){
	if(cells == null) return;

	var newCells = [];
	for(var i = 0; i<cells.length;i++){
		newCells[i] = [cells[i][0],cells[i][1]];
	}
	return newCells;
}