/*
 *  Copyright 2019, 2020, 2021, 2022 LiteFarm.org
 *  This file is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

import './dotenvConfig.js';

// import path from 'path';

// import dotenv from 'dotenv';
// console.log("Starting up")
//
// dotenv.config();
// dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
import express from 'express';
const app = express();
import * as Sentry from '@sentry/node';
import expressOasGenerator from 'express-oas-generator';
const environment = process.env.NODE_ENV || 'development';

if (process.env.SENTRY_DSN && environment !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      // Automatically instrument Node.js libraries and frameworks
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    release: '3.6.3',
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  // RequestHandler creates a separate execution context, so that all
  // transactions/spans/breadcrumbs are isolated across requests
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
}
/*
 expressOasGenerator (EOG) automatically creates API documentation.
 Endpoint documentation is generated from route definitions.
 Payload documentation is generated by monitoring network requests and responses.

 Version-controlled JSON files contain official documentation.
 To update them, define env var UPDATE_OAS_FILES (any value), run automated tests, and commit.

 EOG serves the documentation at public URL /api-docs.
 When running in production mode, the documentation is only the contents of the JSON files.
 In other modes, EOG incorporates changes and additions it detects, but does not save them unless the env var is set.

 To observe all network payloads, EOG's middlewares must be first and last in the chain, AND the chain cannot be broken.
 IOW, some payloads will probably go undocumented until we refactor middleware and route handlers to always call next().
 See https://github.com/mpashkovskiy/express-oas-generator#troubleshooting
 */
expressOasGenerator.handleResponses(app, {
  alwaysServeDocs: true,
  specOutputPath: process.env.UPDATE_OAS_FILES ? './oas.json' : undefined,
  specOutputFileBehavior: expressOasGenerator.SPEC_OUTPUT_FILE_BEHAVIOR.PRESERVE,
  tags: [
    'contact',
    'crop',
    'disease',
    'document',
    'expense',
    'farm',
    'fertilizer',
    'field',
    'fieldCrop',
    'insight',
    'location',
    'log',
    'management_plan',
    'notification',
    'organic_certifier_survey',
    'password',
    'pesticide',
    'price',
    'product',
    'roles',
    'sale',
    'sensors',
    'signup',
    'spotlight',
    'support',
    'task',
    'task_type',
    'user',
    'userFarm',
    'userFarmData',
    'yield',
  ],
});

import promiseRouter from 'express-promise-router';
import { Model } from 'objection';
import checkJwt from './middleware/acl/checkJwt.js';
import cors from 'cors';

// initialize knex
import knex from './util/knex.js';

// bind all models to a knex instance
Model.knex(knex);

// import logger
import logger from './common/logger.js';

// import routes
import loginRoutes from './routes/loginRoute.js';

import defaultAnimalTypeRoute from './routes/defaultAnimalTypeRoute.js';
import customAnimalTypeRoute from './routes/customAnimalTypeRoute.js';
import defaultAnimalBreedRoute from './routes/defaultAnimalBreedRoute.js';
import customAnimalBreedRoute from './routes/customAnimalBreedRoute.js';
import animalRoute from './routes/animalRoute.js';
import animalBatchRoute from './routes/animalBatchRoute.js';
import animalIdentifierColorRoute from './routes/animalIdentifierColorRoute.js';
import animalIdentifierPlacementRoute from './routes/animalIdentifierPlacementRoute.js';
import animalSexRoute from './routes/animalSexRoute.js';
import animalOriginRoute from './routes/animalOriginRoute.js';
import animalGroupRoute from './routes/animalGroupRoute.js';
import animalRemovalReasonRoute from './routes/animalRemovalReasonRoute.js';
import animalUseRoute from './routes/animalUseRoute.js';
import cropRoutes from './routes/cropRoute.js';
import cropVarietyRoutes from './routes/cropVarietyRoute.js';
import fieldRoutes from './routes/fieldRoute.js';
import saleRoutes from './routes/saleRoute.js';
import taskTypeRoutes from './routes/taskTypeRoute.js';
import soilAmendmentMethodRoute from './routes/soilAmendmentMethodRoute.js';
import soilAmendmentPurposeRoute from './routes/soilAmendmentPurposeRoute.js';
import soilAmendmentFertiliserTypeRoute from './routes/soilAmendmentFertiliserTypeRoute.js';
import userRoutes from './routes/userRoute.js';
import farmExpenseRoute from './routes/farmExpenseRoute.js';
import farmExpenseTypeRoute from './routes/farmExpenseTypeRoute.js';
import revenueTypeRoute from './routes/revenueTypeRoute.js';
import farmRoutes from './routes/farmRoute.js';
import logRoutes from './routes/logRoute.js';
import managementPlanRoute from './routes/managementPlanRoute.js';
import fertilizerRoutes from './routes/fertilizerRoute.js';
import diseaseRoutes from './routes/diseaseRoute.js';
import pesticideRoutes from './routes/pesticideRoute.js';
import yieldRoutes from './routes/yieldRoute.js';
import priceRoutes from './routes/priceRoute.js';
import insightRoutes from './routes/insightRoute.js';
import locationRoute from './routes/locationRoute.js';
import userFarmDataRoute from './routes/userFarmDataRoute.js';
import userFarmRoute from './routes/userFarmRoute.js';
import rolesRoutes from './routes/rolesRoute.js';
import organicCertifierSurveyRoutes from './routes/organicCertifierSurveyRoute.js';
import passwordResetRoutes from './routes/passwordResetRoute.js';
import showedSpotlightRoutes from './routes/showedSpotlightRoute.js';
import releaseBadgeRoutes from './routes/releaseBadgeRoute.js';
import nominationRoutes from './routes/nominationRoute.js';
import userLogRoute from './routes/userLogRoute.js';

import supportTicketRoute from './routes/supportTicketRoute.js';
import exportRoute from './routes/exportRoute.js';
import farmTokenRoute from './routes/farmTokenRoute.js';
import documentRoute from './routes/documentRoute.js';
import taskRoute from './routes/taskRoute.js';
import productRoute from './routes/productRoute.js';
import notificationUserRoute from './routes/notificationUserRoute.js';
import timeNotificationRoute from './routes/timeNotificationRoute.js';
import sensorRoute from './routes/sensorRoute.js';

// register API
const router = promiseRouter();

app.get('/', (req, res) => {
  res.sendStatus(200);
});

/**
 * Configures Express to send custom JSON for specified object keys (database column names).
 * Postgres `date` type fields, which have no time portion, are retrieved as JS Date objects with midnight UTC time.
 * `JSON.stringify` transforms the Date object to '2020-01-15T00:00:00.000Z' which the API transmits to the client.
 * A Pacific time client using local form, '2020-01-14T16:00:00.000-08:00', and ignoring time, ends up with wrong date.
 * To address this, we make stringify produce '2020-01-15T00:00:00.000', the date with midnight of unspecified timezone.
 * Clients treat this as midnight local time, preserving the correct date value.
 * Note that the code will also handle string values with format YYYY-MM-DD or YYYY-MM-DDT00:00:00.000 --
 *   values that do not come from the database, but occur as "literals", if only in test.
 * Strings that are not dates, have non-midnight times, or timezones other than Z are not changed, with a log message--
 *   these unexpected values will likely lead to errors.
 */
app.set('json replacer', (key, value) => {
  // A list of database column names with Postgres type `date`.
  // (Except as bindings for `date` type database columns, avoid these keys in objects sent via JSON/HTTPS.)
  const pgDateTypeFields = [
    'abandon_date',
    'complete_date',
    'due_date',
    'effective_date',
    'germination_date',
    'harvest_date',
    'plant_date',
    'seed_date',
    'start_date',
    'termination_date',
    'transition_date',
    'transplant_date',
    'valid_until',
    'sale_date',
  ];

  if (value && pgDateTypeFields.includes(key)) {
    // Valid values *must* start YYYY-MM-DD. Time portion of midnight *may* be present. Time zone Z *may* be present.
    const validDateTypeValues = /^(\d{4}-[0-1]\d-[0-3]\d)(T00:00:00\.000)?Z?$/;

    const matches = value.match(validDateTypeValues);
    if (matches) return `${matches[1]}T00:00:00.000`; // YYYY-MM-DD with midnight time, no timezone indicator.

    console.log(
      `JSON payload problem: key '${key}' is reserved for db date fields; unexpected value ${value}.`,
    );
  }
  return value;
});

// Apply default express.json() request size limit to all routes except sensor webhook
const applyExpressJSON = (req, res, next) => {
  if (req.path.startsWith('/sensor/reading/partner/1/farm/')) return next();

  const jsonMiddleware = express.json({ limit: '100kB' });
  jsonMiddleware(req, res, next);
};

// Refuse GET or DELETE requests with a request body
const rejectBodyInGetAndDelete = (req, res, next) => {
  if (
    (req.method === 'DELETE' || req.method === 'GET') &&
    req.body &&
    Object.keys(req.body).length > 0
  ) {
    return res.sendStatus(400);
  }
  next();
};

app
  .use(applyExpressJSON)
  .use(express.urlencoded({ extended: true }))
  .disable('x-powered-by')

  // prevent CORS errors
  .use(cors())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    rejectBodyInGetAndDelete(req, res, next);
  })
  .use(router)
  .set('json spaces', 2)
  .use('/login', loginRoutes)
  .use('/password_reset', passwordResetRoutes)
  // ACL middleware
  .use(checkJwt)

  // routes
  .use('/default_animal_types', defaultAnimalTypeRoute)
  .use('/custom_animal_types', customAnimalTypeRoute)
  .use('/default_animal_breeds', defaultAnimalBreedRoute)
  .use('/custom_animal_breeds', customAnimalBreedRoute)
  .use('/animals', animalRoute)
  .use('/animal_batches', animalBatchRoute)
  .use('/animal_identifier_colors', animalIdentifierColorRoute)
  .use('/animal_identifier_placements', animalIdentifierPlacementRoute)
  .use('/animal_sexes', animalSexRoute)
  .use('/animal_origins', animalOriginRoute)
  .use('/animal_groups', animalGroupRoute)
  .use('/animal_removal_reasons', animalRemovalReasonRoute)
  .use('/animal_uses', animalUseRoute)
  .use('/location', locationRoute)
  .use('/userLog', userLogRoute)
  .use('/crop', cropRoutes)
  .use('/crop_variety', cropVarietyRoutes)
  .use('/field', fieldRoutes)
  .use('/sale', saleRoutes)
  .use('/revenue_type', revenueTypeRoute)
  .use('/task_type', taskTypeRoutes)
  .use('/soil_amendment_purpose', soilAmendmentPurposeRoute)
  .use('/soil_amendment_method', soilAmendmentMethodRoute)
  .use('/soil_amendment_fertiliser_type', soilAmendmentFertiliserTypeRoute)
  .use('/user', userRoutes)
  .use('/expense', farmExpenseRoute)
  .use('/expense_type', farmExpenseTypeRoute)
  .use('/farm', farmRoutes)
  .use('/log', logRoutes)
  .use('/management_plan', managementPlanRoute)
  .use('/fertilizer', fertilizerRoutes)
  .use('/disease', diseaseRoutes)
  .use('/pesticide', pesticideRoutes)
  .use('/yield', yieldRoutes)
  .use('/price', priceRoutes)
  .use('/insight', insightRoutes)
  .use('/farmdata', userFarmDataRoute)
  .use('/user_farm', userFarmRoute)
  .use('/roles', rolesRoutes)
  .use('/organic_certifier_survey', organicCertifierSurveyRoutes)
  .use('/support_ticket', supportTicketRoute)
  .use('/export', exportRoute)
  .use('/showed_spotlight', showedSpotlightRoutes)
  .use('/release_badge', releaseBadgeRoutes)
  .use('/farm_token', farmTokenRoute)
  .use('/document', documentRoute)
  .use('/task', taskRoute)
  .use('/product', productRoute)
  .use('/nomination', nominationRoutes)
  .use('/notification_user', notificationUserRoute)
  .use('/time_notification', timeNotificationRoute);

// Allow a 1MB limit on sensors to match incoming Ensemble data
app.use('/sensor', express.json({ limit: '1MB' }), rejectBodyInGetAndDelete, sensorRoute);

if (process.env.SENTRY_DSN && environment !== 'development') {
  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
}
expressOasGenerator.handleRequests();

// handle errors
app
  .use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  })
  .use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

const port = process.env.PORT || 5000;
if (
  environment === 'development' ||
  environment === 'production' ||
  environment === 'integration'
) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    logger.info('LiteFarm Backend listening on port ' + port);
  });
}

app.on('close', () => {
  knex.destroy();
});

export default app;
