# Openbridge - A billing proxy for your API
 Projekt pri predmetu OPB na Fakulteti za matematiko in fiziko

 ## Osnovna ideja
 Izdelati spletno aplikacijo, ki omogoča lažjo monetizacijo obstoječih API storitev. Primer uporabe je npr. doma narejen AI model (ali več le teh), dostopen prek svojega lastnega API. Z uporabo Openbridge, lahko ponudnik v trgovini `API Marketplace` objavi svoje API storitve. Le-te lahko nato najamejo drugi uporabniki in za API klice plačujejo po shemi pay-as-you-go. V tehničnem smislu Openbridge deluje tako, da za vsako API storitev ustvari svoj URL in uporabniški API ključ. Vsi zahtevki so posredovani ponudniku storitve (deluje kot proxy), pri tem pa beleži uporabo in zaračunava stroške na podlagi cenika, ki ga za posamezne API klice določi ponudnik (zato billing proxy).  

 ## Spletna stran
- Aplikacija: [https://app.openbridge.me/](https://app.openbridge.me/)
- API definicija: [https://openbridge.me/api/](https://openbridge.me/api/schema/swagger)

 ## ER Diagram
 Generiran avtomatsko na podlagi obstoječih modelov (še ni posodobljen)
 
 ![ER](https://raw.githubusercontent.com/lukaske/openbridge/430a106314b31105f789805fcaf005a7c5443940/openbridge/ERD.svg)

## Primer uporabe
1. Uporabnik se registrira
2. 1. Uporabnik ustvari svoj API in mu dodeli t.i. Billing rule (ali)
   2. Uporabnik najame API
3. Uporabnik uporablja želeni API, npr. s pomočjo `curl`: 

```commandline
curl --location 'https://openbridge.me/b/cat-facts-111/fact/' \
--header 'Authorization: Api-Key QoQDZLzK.fM2ZUWRXePfNgyxtHYdK1kiHfhjw4vSL' \
```
4. Uporabnik preveri statistiko svoje uporabe
5. Uporabnik izračuna stroške v zavihku "Billing" (v originalu CRON job, za demo namenski gumb)

 ## Ekipa
 Luka Skeledžija

 ---
