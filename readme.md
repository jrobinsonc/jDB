# jDB

## Introducción

Esto es un intento de crear una forma de almacenar valores mediante JavaScript y depués tener como obtener y/o buscar estos valores de la forma mas sencilla posible.

## Como usar

### Instanciando

```javascript
var mydb = new jDB();
```

### Insertando registros

Para insertar registros se usa el metodo `save`, que acepta 2 parametros: el nombre de la tabla y el registro que quieres insertar. El registro debe ser un *JSON*.

```javascript
var id = mydb.save("staff", {  
    name: "Juan",  
    age: 27  
});
```

No hay que crear la tabla para poder insertarle registros, como se haria en motores tradicionales de bases de datos. Solo debes insertar el registro y la tabla es creada. Tampoco es necesario que los registros tengan la misma cantidad de columnas. Por ejemplo puedes insertar un registro de 2 columnas y despues otro de 3. Por ejemplo:

```javascript
var id = mydb.save("staff", {  
    name: "Pedro",  
    age: 25  
});

var id = mydb.save("staff", {  
    name: "Maria",  
    age: 29,
    position: "Directora"  
});
```

### Obteniendo registros

Para obtener todos los registros:

```javascript
var result = mydb.find("staff"));
```

Obtener los registros que tenga una columna `name` y esta tenga el valor `Juan`:

```javascript
var result = mydb.find("staff", {name: "Juan"}));
```

Tambien puedes usar expresiones regulares. Por ejemplo, para buscar todos los registros que en la columna `name` empiecen por `J`:

```javascript
var result = mydb.find("staff", {name: /^J/}));
```

Si deseas obtener los registros que tengan un valor por encima de `25` en la columna `age`:

```javascript
var result = mydb.find("staff", {age: {gt: 25}}));
```

Si deseas obtener solo la primera fila:

```javascript
var result = mydb.find("staff", {name: /^J/}).first());
```
