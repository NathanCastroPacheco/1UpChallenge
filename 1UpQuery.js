// Set up JDBC connection
    var presto = require('presto-client');
    var client = new presto.Client({user: 'presto', host: '34.74.56.14', catalog: 'hive', schema: 'leap'});

    // Construct SQL query

   var query = "select json_extract_scalar(json,'$.substance.coding[0].code'), " +
		"json_extract_scalar(json, '$.substance.coding[0].display') from 			allergyintolerance a WHERE " + "json_extract_scalar(json,'$.patient.reference')  ="  + " CONCAT('urn:uuid:', (select json_extract_scalar(json,'$.id') " + "from patient p WHERE json_extract_scalar(json,'$.name[0].family[0]')  = 'Zboncak558' " +
                "AND json_extract_scalar(json,'$.name[0].given[0]') = 'Marshall526'))";


    // Query the Analytics Engine
    client.execute({
        query:   query,
        catalog: 'hive',
        schema:  'leap',
	state:   function(error, query_id, stats){ console.log({message:"status changed", 	id:query_id, stats:stats}); },
        columns: function(error, data){ console.log({resultColumns: data}); },
        data:    function(error, data, columns, stats){ console.log(data); },
        success: function(error, stats){},
        error:   function(error){ console.log('e', error) }
});
