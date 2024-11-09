# Reporte-de-multiples-propiedades-de-Google-Analytics-4
Reporte de Google Analytics 4 en Google Sheets para múltiples cuentas V 2.1  - Aplicación de Google Apps Script + G. Sheets + Google Analytics Data API v1

/**									
*									
* Reporte de Google Analytics 4 en Google Sheets para múltiples cuentas V 2.1  - Aplicación de Google Apps Script + G. Sheets + Google Analytics Data API v1									
*									
* desarrollado por Gonzalo Reynoso, DDW -									
* https://ddw.com.ar - gonzita@gmail.com									
*									
* licencia MIT: podés darle cualquier uso sin garantías y bajo tu responsabilidad,									
* sin eliminar el crédito de autor									
**/									
									
DESCRIPCIÓN - 									
Esta aplicación te permite descargar reportes para varias cuentas/propiedades de Google Analytics 4, configurando el periodo de informe, las dimensiones y métricas que deseas obtener									
									
Posee licencia MIT: podés usarlo sin cargo, modificarlo, etc, sin garantías y bajo tu propia responsabilidad, pero no elimines los créditos del autor									
									
									
SETUP  - INSTRUCCIONES PARA IMPLEMENTAR LA APLICACIÓN									
1) crea una copia de esta hoja de cálculo https://docs.google.com/spreadsheets/d/1pV0TuwOSwiNlFVUeWTpWYNGyQ55n-9MYiIYjeuncwZk/edit?usp=sharing en tu espacio de Google Drive: archivo >> crear una copia									
2) edita la pestaña "config" (solo las celdas amarillas) con tus ids de propiedades de Google Analytics 4 y el streamname (no es obligatorio pero sí necesario para identificar las propiedades)									
3) edita en la pestaña "config" las dimensiones y métricas que deseas obtener en el reporte (por defecto el reporte está configurado para el mes anterior al actual pero podés configurarlo desde el código fuente del script entre las lineas 24 y 45)									
4) andá a la pestaña "datosanalytics" y hacé clic en el botón "actualizar reportes" (la primera vez tendrás que dar todos los permisos de acceso a tu cuenta por parte de la aplicación)									
5) si lo deseas agrupa los datos con tablas dinámicas en la pestaña "datosagrupados"																	
