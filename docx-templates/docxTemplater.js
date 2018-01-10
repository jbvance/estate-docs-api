const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const uuidv4 = require('uuid/v4');
//const expressions= require('angular-expressions');

const fs = require('fs');
const path = require('path');

//Load the docx file as a binary
module.exports = {
    SaveDoc: (dataPlaceholder => {
        const content = fs
            .readFileSync(path.resolve(__dirname, 'dpoa-1.docx'), 'binary');

        var zip = new JSZip(content);

        var doc = new Docxtemplater();
        doc.loadZip(zip).setOptions({ paragraphLoop: true });

        //set the templateVariables
        const data = {
            firstName: 'John',
            lastName: 'Doe',
            address: '1234 Main St.',
            city: 'Houston',
            state: 'TX',
            zip: '77002',
            agents: [
                {
                    firstName: 'Mike',
                    lastName: 'Smith',
                    address: '9876 Jones St.',
                    city: 'Tulsa',
                    state: 'OK',
                    zip: '74555'
                },
                {
                    firstName: 'Jim',
                    lastName: 'Jackson',
                    address: '8179 W. 34th St.',
                    city: 'Dallas',
                    state: 'TX',
                    zip: '99999'
                },
                {
                    firstName: 'Whitt',
                    lastName: 'Byron',
                    address: '3400 Oak Forest St.',
                    city: 'Houston',
                    state: 'TX',
                    zip: '77018'
                }
            ]
        };

        data['primaryAgent'] = data.agents[0]
        // place contingent agents into a separate array for processing if present
        data['contingentAgents'] = data.agents && data.agents.length > 1 ? data.agents.slice(1) : [];    
        data['hasContingentAgents'] = data['contingentAgents'].length > 0;
        //Load data into template
        doc.setData(data);


        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        }
        catch (error) {
            const e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({ error: e }));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }

        const buf = doc.getZip()
            .generate({ type: 'nodebuffer' });

        // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
        fs.writeFileSync(path.resolve(__dirname, 'output_docs', `${uuidv4()}.docx`), buf);
    })
}
