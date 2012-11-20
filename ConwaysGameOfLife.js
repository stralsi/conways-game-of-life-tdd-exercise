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

	function copyCells(cells){
		if(cells == null) return;

		var newCells = [];
		for(var i = 0; i<cells.length;i++){
			newCells[i] = [cells[i][0],cells[i][1]];
		}
		return newCells;
	}
}

