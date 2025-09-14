"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_json_1 = __importDefault(require("./data/data.json"));
var graphology_1 = __importDefault(require("graphology"));
var graphology_layout_1 = require("graphology-layout");
var graphology_layout_forceatlas2_1 = __importDefault(require("graphology-layout-forceatlas2"));
var worker_1 = __importDefault(require("graphology-layout-forceatlas2/worker"));
var sigma_1 = __importDefault(require("sigma"));
var utils_1 = require("sigma/utils");
exports.default = (function () {
    // Initialize the graph object with data
    var graph = new graphology_1.default();
    graph.import(data_json_1.default);
    // Retrieve some useful DOM elements:
    var container = document.getElementById("sigma-container");
    var FA2Button = document.getElementById("forceatlas2");
    var FA2StopLabel = document.getElementById("forceatlas2-stop-label");
    var FA2StartLabel = document.getElementById("forceatlas2-start-label");
    var randomButton = document.getElementById("random");
    var circularButton = document.getElementById("circular");
    /** FA2 LAYOUT **/
    /* This example shows how to use the force atlas 2 layout in a web worker */
    // Graphology provides a easy to use implementation of Force Atlas 2 in a web worker
    var sensibleSettings = graphology_layout_forceatlas2_1.default.inferSettings(graph);
    var fa2Layout = new worker_1.default(graph, {
        settings: sensibleSettings,
    });
    // A button to trigger the layout start/stop actions
    // A variable is used to toggle state between start and stop
    var cancelCurrentAnimation = null;
    // correlate start/stop actions with state management
    function stopFA2() {
        fa2Layout.stop();
        FA2StartLabel.style.display = "flex";
        FA2StopLabel.style.display = "none";
    }
    function startFA2() {
        if (cancelCurrentAnimation)
            cancelCurrentAnimation();
        fa2Layout.start();
        FA2StartLabel.style.display = "none";
        FA2StopLabel.style.display = "flex";
    }
    // the main toggle function
    function toggleFA2Layout() {
        if (fa2Layout.isRunning()) {
            stopFA2();
        }
        else {
            startFA2();
        }
    }
    // bind method to the forceatlas2 button
    FA2Button.addEventListener("click", toggleFA2Layout);
    /** RANDOM LAYOUT **/
    /* Layout can be handled manually by setting nodes x and y attributes */
    /* This random layout has been coded to show how to manipulate positions directly in the graph instance */
    /* Alternatively a random layout algo exists in graphology: https://github.com/graphology/graphology-layout#random  */
    function randomLayout() {
        // stop fa2 if running
        if (fa2Layout.isRunning())
            stopFA2();
        if (cancelCurrentAnimation)
            cancelCurrentAnimation();
        // to keep positions scale uniform between layouts, we first calculate positions extents
        var xExtents = { min: 0, max: 0 };
        var yExtents = { min: 0, max: 0 };
        graph.forEachNode(function (_node, attributes) {
            xExtents.min = Math.min(attributes.x, xExtents.min);
            xExtents.max = Math.max(attributes.x, xExtents.max);
            yExtents.min = Math.min(attributes.y, yExtents.min);
            yExtents.max = Math.max(attributes.y, yExtents.max);
        });
        var randomPositions = {};
        graph.forEachNode(function (node) {
            // create random positions respecting position extents
            randomPositions[node] = {
                x: Math.random() * (xExtents.max - xExtents.min),
                y: Math.random() * (yExtents.max - yExtents.min),
            };
        });
        // use sigma animation to update new positions
        cancelCurrentAnimation = (0, utils_1.animateNodes)(graph, randomPositions, { duration: 2000 });
    }
    // bind method to the random button
    randomButton.addEventListener("click", randomLayout);
    /** CIRCULAR LAYOUT **/
    /* This example shows how to use an existing deterministic graphology layout */
    function circularLayout() {
        // stop fa2 if running
        if (fa2Layout.isRunning())
            stopFA2();
        if (cancelCurrentAnimation)
            cancelCurrentAnimation();
        //since we want to use animations we need to process positions before applying them through animateNodes
        var circularPositions = (0, graphology_layout_1.circular)(graph, { scale: 100 });
        //In other context, it's possible to apply the position directly we : circular.assign(graph, {scale:100})
        cancelCurrentAnimation = (0, utils_1.animateNodes)(graph, circularPositions, { duration: 2000, easing: "linear" });
    }
    // bind method to the random button
    circularButton.addEventListener("click", circularLayout);
    /** instantiate sigma into the container **/
    var renderer = new sigma_1.default(graph, container);
    return function () {
        renderer.kill();
    };
});
