const index = {
    production:{
        PORT: 1234
    },
    development:{
        PORT:5000
    }
}

module.exports = index[process.env.node_env || 'development']