export class DestinoViaje {
	//nombre:string;
	//imagenUrl:string;
	private selected: boolean;
	public servicios: string[];
	constructor(public nombre: string, public u:string){
		//this.nombre = n;
		//this.imagenUrl = u;
		this.servicios = ['pileta', 'desayuno'];
	}
	isSelected(): boolean{
			return this.selected;
	}
	setSelected(s: boolean){
		this.selected = s;
	}
}