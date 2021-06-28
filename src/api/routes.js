const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { searchValidator } = require("./middleware");

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for results
 *     parameters:
 *     - name: driver
 *       description: Select the driver to use for the search
 *       in: query
 *       schema:
 *           type: string
 *           enum: [zippyshare, 1337x]
 *           default: zippyshare
 *     - name: query
 *       description: Input your search query
 *       in: query
 *       type: string
 *       required: true
 *     - name: page
 *       description: Specify the page number
 *       in: query
 *       required: true
 *       schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Your get the search results
 *         content:
 *           application/json:
 *               schema:
 *                     type: object
 *                     properties:
 *                         data:
 *                             type: array
 *                             items:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                      url:
 *                                          type: string
 *                                      size:
 *                                          type: string
 *       500:
 *         description: You get an empty result
 *         content:
 *           application/json:
 *               schema:
 *                     type: object
 *                     properties:
 *                         data:
 *                             type: array
 *                             example: []
 *
 */
router.get("/search", searchValidator, controller.search);

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Get a list of results
 *     parameters:
 *     - name: driver
 *       description: Select the driver to use in retrieving the list
 *       in: query
 *       schema:
 *           type: string
 *           enum: [zippyshare, 1337x]
 *           default: zippyshare
 *     - name: page
 *       description: Specify the page number
 *       in: query
 *       required: true
 *       schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: You get the result list
 *         content:
 *           application/json:
 *               schema:
 *                     type: object
 *                     properties:
 *                         data:
 *                             type: array
 *                             items:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                      url:
 *                                          type: string
 *                                      size:
 *                                          type: string
 *       500:
 *         description: You get an empty list
 *         content:
 *           application/json:
 *               schema:
 *                     type: object
 *                     properties:
 *                         data:
 *                             type: array
 *                             example: []
 *
 */
router.get("/list", controller.list);

module.exports = router;
