# Openbridge - A billing proxy for your API
 Projekt pri predmetu OPB na Fakulteti za matematiko in fiziko

 ## Osnovna ideja
 Izdelati spletno aplikacijo, ki omogoča lažjo monetizacijo obstoječih API storitev. Primer uporabe je npr. doma narejen AI model (ali več le teh), dostopen prek svojega lastnega API. Z uporabo Openbridge, lahko ponudnik v trgovini `API Marketplace` objavi svoje API storitve. Le-te lahko nato najamejo drugi uporabniki in za API klice plačujejo po shemi prek pay-as-you-go. V tehničnem smislu Openbridge deluje tako, da za vsako API storitev ustvari svoj URL in uporabniški API ključ. Vsi zahtevki so posredovani ponudniku storitve (Openbridge deluje kot proxy), pri tem pa beleži uporabo in zaračunava stroške na podlagi cenika, ki ga za posamezne API klice določi ponudnik (billing proxy).  

 ## Spletna stran
- Aplikacija: [https://app.openbridge.me/](https://app.openbridge.me/)
- API definicija: [https://openbridge.me/api/](https://openbridge.me/api/schema/swagger)

 ## ER Diagram
 Generiran avtomatsko na podlagi obstoječih modelov (še ni posodobljen) 
 
 ![ER](https://raw.githubusercontent.com/lukaske/openbridge/main/openbridge/ERD.png)

 ## Ekipa
 Luka Skeledžija

 ---
