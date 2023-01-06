
# Metadata & Instance Test Cases ![2.0](https://img.shields.io/badge/FDC3-2.0-blue)

You will need to pre-populate the AppDirectory with the following items:

| App | Required Metadata                        |
|-----|------------------------------------------|
| A   | Generic AppD Record which contains at least the following fields:<br>- `name`<br>- `version`<br>- `title`<br>- `tooltip`<br>- `description`<br>- `icons` (`Array<Icon>`)<br>- `screenshots` (`Array<Image>`)<br>- `interop.intents.listensFor` (`aTestingIntent` with at least context type `testContextX`)  |

## Get App Metadata

| App | Step           | Details                                                                                           |
|-----|----------------|---------------------------------------------------------------------------------------------------|
| Test   | 1. getAppMetadata    | Retrieve metadata for the configured app A  |
| Test   | 2. Confirm AppMetadata    | Compare the `AppMetadata` object to the expected definition for the fields provided above during setup and ensure that the metadata matches. An `instanceId` should NOT be set  |

- `GetAppMetadata`: perform the above steps

## Instance Metadata

| App | Step           | Details                                                                                           |
|-----|----------------|---------------------------------------------------------------------------------------------------|
| Test   | 1. Open1    | Open the first instance of App A using it's App ID and retrieve its `AppIdentifier` with instance details.  |
| Test   | 2. Open2    |Open a second instanceo of App A and retrieve its `AppIdentifier` with instance details.  Confirm that the `instanceId` differs from the first instance.  |
| Test   | 3. getAppMetadata1    | Retrieve metadata for the first instance of the app  |
| Test   | 4. Confirm Instance AppMetadata1    | Compare the `AppMetadata` object to the expected definition for the fields provided above during setup and ensure that the metadata matches.  An `instanceId` should be provided, confirm that it matches the one in `appIdentifier1`  |
| Test   | 5. getAppMetadata2    | Retrieve metadata for the second instance of the app  |
| Test   | 6. Confirm Instance AppMetadata2    | An `instanceId` should be provided, confirm that it matches the one in `appIdentifier2`  |

- `AppInstanceMetadata`: Perform the above steps

## Finding Instances

| App | Step           | Details                                                                                           |
|-----|----------------|---------------------------------------------------------------------------------------------------|
| Test   | 1. OpenFindInstances1    |Start an instance of App A and retrieve its `AppIdentifier` with instance details.  |
| Test   | 2. OpenFindInstances2 | Open a second instanceo of App A and retrieve its `AppIdentifier` with instance details.  Confirm that the `instanceId` differs from the first instance. |
| Test   | 3. FindInstances    | Retrieve details of open instances with the `findInstances` function, confirm that both `appIdentifier1` and `appIdentifier2` are both present in the array.  |
| Test   | 4. RaiseIntent   | Use appIdentifier1 to raise an intent and target that instance. |
| Test   | 5. ConfirmInstanceMetadata1 | Check that `resolution.source` matches `appIdentifier1` |
| A | 6. ConfirmInstanceMetadata1 | Ensure that the instance of app A represented by `appIdentifier1` received the raised intent |

- `FindInstances`: Perform the above steps

## Getting Info For The Agent

| App | Step           | Details                                                                                           |
|-----|----------------|---------------------------------------------------------------------------------------------------|
| Test   | 1. getInfo    |Retrieve the `ImplementationMetadata` for the DesktopAgent |
| Test   | 2. ConfirmImplementationMetadata_fdc3Version  | Check that the `fdc3Version` variable is present and at or greater than 2.0 (which you can do with the [`versionIsAtLeast` function from FDC3's Methods.ts](https://github.com/finos/FDC3/blob/add64f8302c6dcdc8437cf0e245101e927b69ec2/src/api/Methods.ts#L207):<br>`const isFDC3v2 = versionIsAtLeast(implMetadata, "2.0")`  |
| Test   | 3. ConfirmImplementationMetadata_provider  | Check that the `provider` variable is present and not an empty string  |
| Test   | 4. ConfirmImplementationMetadata_optionalFeatures  | Check that the `optionalFeatures`, `optionalFeatures.OriginatingAppMetadata` and `optionalFeatures.UserChannelMembershipAPIs` variables are all present and that the latter two provide boolean values  |

- `GetInfo1`: Perform the above steps

| App | Step           | Details                                                                                           |
|-----|----------------|---------------------------------------------------------------------------------------------------|
| Test   | 1. Open1    | Start an instance of App A and retrieve its `AppIdentifier` with instance details. Confirm that the `AppIdentifier` contains both an `appId` and `instanceId` |
| A | 2. getInfo     |   Retrieve the `ImplementationMetadata` for the DesktopAgent - which should include `AppMetadata` for the retrieving app. |
| A + Test | 3. ConfirmImplementationMetadata_appMetadata  | Check that `implMetadata.appMetadata` contains an `appId` and `instanceId` matching that retrieved in the first step (will require transmission of the details from A to Test or vice-versa). Also compare the `AppMetadata` object to the expected definition for the fields provided above during setup and ensure that the metadata matches. |

- `GetInfo2`: Perform the above steps.