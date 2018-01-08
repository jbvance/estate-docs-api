const createReport = require('docx-templates');
var fs = require('fs');
var path = require('path');

exports.makeDocx = (content) => {
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

    if (data.agents && data.agents.length > 1) {
        data['contingentAgents'] = data.agents.slice(1);       
    }

    createReport({
        template: path.resolve(__dirname, 'dpoa.docx'),
        output: path.resolve(__dirname, 'output.docx'),
        data
      });
}
