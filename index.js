/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const Akko = require('./lib/Akko');
const RingVisualiser = require('./lib/visualisers/RingVisualiser');

module.exports = Akko;
module.exports.visualisers = {
    RingVisualiser,
};
