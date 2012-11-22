Universe = function(initialState){
	var _currentGeneration = copyCells(initialState);

	this.tick = function(){
		 var newGeneration = copyCells(_currentGeneration);

		 for(var i = 0; i<_currentGeneration.length;i++){
		 	var cell = _currentGeneration[i];
		 	var neighbourCount = this.getNeighbourCount(cell[0],cell[1]);
			if(neighbourCount != 2 && neighbourCount != 3){
				//find cell in new generation
				var indexOfCellToRemove = 0;
				for(var j = 0; j<newGeneration.length;j++){
					if(newGeneration[j][0] == cell[0] && newGeneration[j][1] == cell[1]){
						indexOfCellToRemove = j;
					}
				}
				//and kill it
				newGeneration.splice(indexOfCellToRemove,1)
			}
		 }
		 _currentGeneration = newGeneration;
	}

	this.getNeighbourCount = function(x,y){
		if(_currentGeneration == null) return false;

		var neighbourCount = 0;
		for(var i = 0; i<_currentGeneration.length;i++){
			if(_currentGeneration[i][0] >= x-1 
			   && _currentGeneration[i][0] <= x+1 
			   && _currentGeneration[i][1] >= y-1 
			   && _currentGeneration[i][1] <= y+1
			   && !(_currentGeneration[i][0] == x && _currentGeneration[i][1] == y)){
				neighbourCount ++;
			}
		}
		return neighbourCount;
	}

	this.hasLife = function(x,y){
		if(_currentGeneration == null) return false;

		for(var i = 0; i<_currentGeneration.length;i++){
			if(_currentGeneration[i][0] == x && _currentGeneration[i][1] ==y){
				return true;
			}
		}
		return false;
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
}

NeighbourMap = function(liveCells){
	
	var _neighbourMap = new CellMap();
	
	for(var i=0;i<liveCells.length;i++){
		var cell = liveCells[i];
		var x = cell[0];
		var y = cell[1];

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
		var previousValue = _neighbourMap.get(x,y);
		var newValue = previousValue == null?1:previousValue+1;
		_neighbourMap.set(x,y,newValue);
	}

 	this.getAllCellsWithNumNeighbours = function(num){
 		return _neighbourMap.getByValue(num);
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