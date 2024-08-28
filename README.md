# Deploy Configurations of CARE

_This repository stores the configurations for various deployments of CARE._

[![Validate Configurations](https://github.com/ohcnetwork/care_deploy_configs/actions/workflows/test.yaml/badge.svg)](https://github.com/ohcnetwork/care_deploy_configs/actions/workflows/test.yaml)

## ⚙️ How it works?

The [CARE front-end](https://github.com/ohcnetwork/care_fe) attempts to fetch configurations from `/config.json` endpoint.
> :bulb: This endpoint can be overriden by defining `REACT_APP_CONFIG_URL` to the desired URL that serves a valid configuration file.

For every deployment, a reverse proxy is set-up for the `/config.json` endpoint which is proxied the raw JSON configuration file stored in this repo.

![image](https://user-images.githubusercontent.com/25143503/209959094-ac877475-835c-42ee-8c2a-cd71faa6791f.png)

All configurations follow a specific schema as defined in the [`config-schema.yaml`](https://github.com/ohcnetwork/care_deploy_configs/blob/main/config_schema.yaml).
The [Validate Configurations](https://github.com/ohcnetwork/care_deploy_configs/actions/workflows/test.yaml) workflow attempts to validate all configurations (JSON files)
present inside the `configs/` directory.

## ☑️ Checklist for adding a new key to existing deployments configurations
Let's say a new key `EXAMPLE_KEY` is to be introduced to the configurations.
1. Update the `config-schema.yaml` for the validation workflow to pass when the new key is present.
2. Define the `EXAMPLE_KEY` for all configurations present inside the `configs/` directory.
3. Run `npm test` to validate the new configurations.
4. Update the [`IConfig`](https://github.com/ohcnetwork/care_fe/blob/develop/src/Common/hooks/useConfig.ts) interface in ohcnetwork/care_fe repo to match the new configurations schema.

## ☑️ Checklist for adding a configuration for a new deployment
Let's say a new deployment `example-deployment` is to be added.
1. Create a copy of an existing configuration and rename it to `example-deployment.json` in the `configs/` directory.
2. Update the configurations to match the specifics of the deployment.
3. Run `npm test` to validate the new configuration.

## Why this approach? 🤔

There are couple of advantages with this approach. It makes managing the configurations easier across multiple deployments,
and more accessible to the team. Also, it makes it easier to not requiring to modify the environment variables post the docker image build, as
these configurations are fetched from an external source now.
