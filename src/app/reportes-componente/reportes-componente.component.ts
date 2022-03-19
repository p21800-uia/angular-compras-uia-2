import { Component, OnInit, Input, Output } from '@angular/core';
import { IReporte } from '../iReporte';
import {ReportesService} from '../reportes.service';
import { ReporteDetalleComponent } from '../reporte-detalle/reporte-detalle.component';

@Component({
  selector: 'app-reportes-componente',
  templateUrl: './reportes-componente.component.html',
  styleUrls: ['./reportes-componente.component.css']
})
export class ReportesComponenteComponent implements OnInit {
 

 public reporte = { name: "", id: 0 }

 reportes: IReporte[] = [];

 selectedReporte?: IReporte;

  constructor( public datosReportes:ReportesService) 
  { 
    
  }
               
  ngOnInit(): void {
               
    this.datosReportes.getReportes().subscribe((data: any[])=>{
      console.log(data);
      this.reportes = data;
    })
    


  }
      
 
  onSelect(reporte: IReporte): void {
    this.selectedReporte = reporte;
  }

  agregar(name: string, id:string): void {
    name = name.trim();

    var newReporte = <IReporte>{};
    
    newReporte.id=id;
    newReporte.name=name;
    newReporte.type="reporteNS";
    
    if (!name) { return; }
    this.datosReportes.agregaReporte(newReporte)
      .subscribe(reporte => {
        this.reportes.push(reporte);
      });
  }
  
}
