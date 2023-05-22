window.onload = function() {
    const network = document.getElementById('mynetwork');
    const nodes = [];
    const edges = [];
    const options = {
        nodes: { shape: 'box' },
        edges: { arrows: 'to' },
    };

    axios.get('https://api.airtable.com/v0/appXXXX/Table%201?api_key=keyXXXX')
    .then(response => {
        const records = response.data.records;
        records.forEach(record => {
            nodes.push({id: record.id, label: record.fields.Name});
            if (record.fields.Linked) {
                record.fields.Linked.forEach(link => {
                    edges.push({from: record.id, to: link});
                });
            }
        });

        const data = {
            nodes: new vis.DataSet(nodes),
            edges: new vis.DataSet(edges)
        };

        const network = new vis.Network(container, data, options);
    })
    .catch(error => console.log(error));
};
