var jDB_Row = function(table_name, row_id, row_data, _jDB) {
    
    var _jDB_Row = this;
    
    _jDB_Row._jDB = _jDB;
    
    _jDB_Row.table_name = table_name;
    _jDB_Row.row_id = row_id;
    _jDB_Row.row_data = row_data;
    
    _jDB_Row.remove = function() {
        _jDB_Row._jDB.remove(_jDB_Row.table_name, _jDB_Row.row_id);
        
        return null;
    };
    
    return _jDB_Row;
}

var jDB_Result = function(data) {
    
    var _jDB_Result = this;
    
    _jDB_Result.rows = data.rows;
    _jDB_Result.num_rows = data.num_rows;
    
    // @todo
    _jDB_Result.sort = function() {
        return _jDB_Result;
    }
    
    // @todo
    _jDB_Result.limit = function() {
        return _jDB_Result;
    }
    
    // @todo
    _jDB_Result.skip = function() {
        return _jDB_Result;
    }
    
    _jDB_Result.first = function() {
        return _jDB_Result.rows[1];
    }
    
    _jDB_Result.last = function() {
        return _jDB_Result.rows[_jDB_Result.num_rows];
    }
    
    return _jDB_Result;
}

var jDB = function() {
    
    RegExp.prototype._jDB_objType = 'RegExp';

    var _jDB = this;

    _jDB.tables = {};
    
    _jDB.error = function(msg) {
        console.error(msg);
    }

    _jDB.find = function(table_name, where) {

        where = where || {};
        var result = {
            num_rows: 0,
            rows: {}
        };

        for (row_id in _jDB.tables[table_name].rows) {
            var row_data = _jDB.tables[table_name].rows[row_id];
            var include_row = true;

            for (field_name in where) {
                var where_value = where[field_name];
                
                // Si el campo no existe en la tabla se excluye el registro.
                if (field_name in row_data === false) {
                    include_row = false;
                    break;
                }
                
                if (typeof where_value == 'object') {
                    
                    if ('gt' in where_value && !(Number(row_data[field_name]) > Number(where_value['gt']))) {
                        include_row = false;
                        break;
                    }
                    
                    // @todo
                    if ('gte' in where_value) {
                        
                    }
                    
                    if ('lt' in where_value && !(Number(row_data[field_name]) < Number(where_value['lt']))) {
                        include_row = false;
                        break;
                    }
                    
                    // @todo
                    if ('lte' in where_value) {
                        
                    }
                    
                    if ('eq' in where_value && !(String(row_data[field_name]) === String(where_value['eq']))) {
                        include_row = false;
                        break;
                    }
                    
                    if ('ne' in where_value && String(row_data[field_name]) === String(where_value['ne'])) {
                        include_row = false;
                        break;
                    }
                    
                    if (where_value._jDB_objType === 'RegExp' && String(row_data[field_name]).match(where_value) === null) {
                        include_row = false;
                        break;
                    }
                    
                } else if (typeof where_value === 'number') {
                    
                    if (Number(row_data[field_name]) !== where_value) {
                        include_row = false;
                        break;
                    }
                    
                } else if (typeof where_value === 'string') {
                    
                    if (String(row_data[field_name]) !== where_value) {
                        include_row = false;
                        break;
                    }
                    
                } else {
                    _jDB.error('find error');
                    return false;
                }
            }

            if (include_row === true) {
                result.rows[row_id] = new jDB_Row(table_name, row_id, row_data, _jDB);
                result.num_rows++;
            }
        }

        return new jDB_Result(result);
    }
    
    _jDB.save = function(table_name, row) {

        if (table_name in _jDB.tables === false) {
            _jDB.tables[table_name] = {
                rows: {}, 
                num_rows: 0
            };
        }

        var id = ++_jDB.tables[table_name].num_rows;

        _jDB.tables[table_name].rows[id] = row;

        return id;
    }
    
    _jDB.remove = function(table_name, row_id){
        delete _jDB.tables[table_name].rows[row_id];
    }

    return _jDB;
}