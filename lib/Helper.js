/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

class Helper {

    lerp(current, target, fraction) {
        return current + (target - current) * fraction;
    }

}

module.exports = Helper;
