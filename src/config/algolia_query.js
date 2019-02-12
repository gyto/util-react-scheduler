export default [
    {
        objectID: 'country',
        condition: {
            pattern: '{facet:country}',
            anchoring: 'contains'
        },
        consequence: {
            params: {
                aroundLatLngViaIP: false
            }
        }
    },
    {
        objectID: 'city',
        condition: {
            pattern: '{facet:city}',
            anchoring: 'contains'
        },
        consequence: {
            params: {
                aroundLatLngViaIP: false
            }
        }
    }
]
