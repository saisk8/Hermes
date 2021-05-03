# Hermes

Hermes is a file clint/server application. It can be used to collect files from systems in a local network. It is made for use cases like lab examinations, coding competitons, where the system adminsitator usually needs to collect files from all the participants. The installtion steps for each are as described below.

## Installation

Clone the repository in both the clients and the server.

```bash
git clone https://github.com/saisk8/Hermes.git
```

Install the dependencies on all the systems. Make sure you have node `14.x` or higher.

```bash
npm install
```
## Usage

### Server

You are allowed to open multiple portals from the same server. A file submitted by a client to a particular portal, say `A`, will be saved at `./{destination}/A`. You can define the destination path and the portal you would like to accept submissions in the config file (`config.js`).

The structure is as follows:

```javascript
{
	destination: '.',
	port: 4000,
	portals: [],
};
```
* `destination`: Path where the files will be saved.
* `port`: The port at which you want to open the server at
* `portals`: An array of strings. Each string is considered as `id` of the portal.

Once you have defined the config run the following command to start the Hermes server:

```bash
node server.js
```

### Client

On the client side, you will need to provide the IP and the port number on which the Hermes server is running. The client will automatically fetch the necessary config details and will present the user with an interactive shell prompt to complete a file submission.

```bash
node client.js --ip <IP> --port <port>
```

**Important: The file to submitted must be in the cwd of `client.js`**

