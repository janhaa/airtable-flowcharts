window.onload = function() {
    const container = document.getElementById('mynetwork');
    const nodes = [];
    const edges = [];
    const options = {
        nodes: { shape: 'box' },
        edges: { arrows: 'to' },
        layout: {
			improvedLayout: false,
			hierarchical: {
				enabled: true,
				// levelSeparation: 150,
				// nodeSpacing: 110,
				// treeSpacing: 200,
				blockShifting: false,
				edgeMinimization: false,
				parentCentralization: true,
				direction: "UD",
				sortMethod: "directed",
				shakeTowards: "roots"
			}
		},
        physics: {
            // enabled: false,
            solver: "hierarchicalRepulsion",
            hierarchicalRepulsion: {
                avoidOverlap: 1,
                nodeDistance: 140,
            }
          },
    };

    axios.get(`https://api.airtable.com/v0/${app}/${table}?filterByFormula=FIND(%22Emalytics%22%2C+Projekt)+%3E+0`, { headers: { 'Authorization': `Bearer ${api_key}` } })
    .then(response => {
        const records = response.data.records;
        records.forEach(record => {
            nodes.push({id: record.id, label: record.fields.Name});
            if(record.fields[linkField]) {
                record.fields[linkField].forEach(link => {
                    edges.push({from: record.id, to: link});
                });
            }
        });

        const data = {
            nodes: new vis.DataSet(nodes),
            edges: new vis.DataSet(edges)
        };

        new vis.Network(container, data, options);
    })
    .catch(error => console.log(error));
};
