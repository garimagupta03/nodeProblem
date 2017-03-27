var fs = require('fs');
var path = require('path');

module.exports = function (req, res, next) {
    if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
    var newfile = req.files.newfile;

    var date = new Date();
    var currentDate = date.getFullYear() + '' + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
    var uploadedFile = __dirname + '/../uploadedFiles/file_'+currentDate+'.txt';
    newfile.mv(uploadedFile, function(err) {
        if (err)
            return res.status(500).send(err);
        else {
            fs.readFile(uploadedFile, 'utf8', function(err, contents) {
                if (err)
                    return res.send(err);

                var numberArray = contents.replace( /\n/g, " " ).split( " " );
               
                var sortedArray = numberArray.map(function(string) {

                  var tempArray = string.split( "," );
                    return (tempArray.sort(function(a,b){
                        return a-b;
                    }).toString()   );

                });

                var file = __dirname + '/../sortedFiles/file_'+currentDate+'.txt';
                fs.writeFile(file, sortedArray.join("\n"), function(err) {
                    if(err) 
                        return console.log(err);
                });
                var filestream = fs.createReadStream(file);
                var filename = path.basename(file);
                res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                filestream.pipe(res);
            });
        }

    });
 
};
