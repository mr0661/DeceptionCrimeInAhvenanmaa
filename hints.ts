var DIV_TABLE_CLASS = "col-sm-3 col-lg-2";
var TABLE_CLASS = "table table-bordered table-hover";
var SELECTABLE_COUNT = 5;

function createAndAppend(name, target)
{
	var created = document.createElement(name);
	target.appendChild(created);
	return created;
}

// Holds current state of hints
interface TableState {
	topic: string
	selectables: Array<string>
	current: number
}

interface State {
	causeTable: TableState
	locationTable: TableState
	clueTables: Array<TableState>
	meansList: Array<string>
	clueList: Array<string>
}

class HintTable {
	state: TableState;
	topic: Element;
	selectables: Array<Element>;
	color;
	constructor(targetLocation, color)
	{
		// Create element into targetLocation
		
		// Header
		let div :Element = createAndAppend("div", targetLocation);
		div.setAttribute("class", DIV_TABLE_CLASS)
		let table :Element = createAndAppend("table", div);
		table.setAttribute("class", TABLE_CLASS)
		let thead :Element = createAndAppend("thead", table);
		let tr :Element = createAndAppend("tr", thead);
		this.topic = createAndAppend("th", tr);
		this.topic.innerHTML = "MEEEH";
		
		// Rest
		let tbody :Element = createAndAppend("tbody", table);
		this.selectables = [];
		for(let i :number = 0; i < SELECTABLE_COUNT ; ++i)
		{
			let tr :Element = createAndAppend("tr", tbody);
			this.selectables[i] = createAndAppend("td", tr);
			this.selectables[i].innerHTML = "meeh"
		}
		
		// Set color
		this.color = color;
	}
	
	update(state : TableState)
	{
		this.state = state;
		this.updateVisuals();
	}

	private setTopicText(newText :string){
		this.topic.innerHTML = newText;
	}
	private setSelectableText(id :number, newText :string){
		this.selectables[id].innerHTML = newText;
	}
	private setActive(id :number){
		for (let i :number = 0 ; i < this.selectables.length ; ++i){
			this.selectables[i].setAttribute("class", i == id ? "active" : "default" )
		}
		if (id < 0){
			this.hide();
		}
		else{
			this.show();
		}
	}
	
	private hide(){
		// This should hide
	}
	
	private show(){
		// This should show
	}
	
	private updateVisuals(){
		 this.setTopicText(this.state.topic);
		 for(let i:number = 0 ; i < this.state.selectables.length ; ++i){
			 this.setSelectableText(i, this.state.selectables[i]);
		 }
		 console.log("TEEEST");
		 this.setActive(this.state.current);
	}
}

class Tables {
	myTables: Array<HintTable>
	constructor(targetLocation){
		// Create all required tables into targetLocation
	}
	
	update(state : State){
		let i :number = 0
		this.myTables[i++].update(state.causeTable);
		this.myTables[i++].update(state.locationTable);
		for( let j :number = 0 ; j < state.clueTables.length ; j++){
			this.myTables[i++].update(state.clueTables[j]);
		}
	}
	
	state() {
		let currentState :State;
		let i :number = 0;
		currentState.causeTable = this.myTables[i++].state;
		currentState.locationTable = this.myTables[i++].state;
		for( let j :number = 0 ; j < (this.myTables.length - 2); j++){
			currentState.clueTables[j] = this.myTables[i++].state;
		}
		return currentState;
	}
}

function start()
{
	// Initialize tables
	requestUpdate();
}

function requestUpdate()
{
	// Send server request for update
}

function sendUpdate(msg:State)
{
	//Send updated state to server
	
	
	//tmp
	serverUpdate(msg);
}

// Server sends update
function serverUpdate(msg:State)
{
	// Update Tables
	
}

let table : HintTable = new HintTable(document.getElementById("FooBar"), "foo");
let table2 : HintTable = new HintTable(document.getElementById("FooBar"), "foo");