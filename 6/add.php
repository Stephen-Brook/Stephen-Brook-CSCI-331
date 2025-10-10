<?php
$dbHost = 'localhost';
$dbUser = 'user05';
$dbPass = '05were';
$dbName = 'db05';
$table  = 'random_users';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli($dbHost, $dbUser, $dbPass);
    $conn->set_charset('utf8mb4');

    //ensure we are using db05
    $conn->query("CREATE DATABASE IF NOT EXISTS `$dbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $conn->select_db($dbName);

    // Create the table if it doesn't exist yet
    $createSql = "
        CREATE TABLE IF NOT EXISTS `$table` (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            first VARCHAR(100) NOT NULL,
            last VARCHAR(100) NOT NULL,
            country VARCHAR(120) NOT NULL,
            city VARCHAR(120) DEFAULT NULL,
            email VARCHAR(190) DEFAULT NULL,
            age INT DEFAULT NULL,
            picture VARCHAR(300) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ";
    $conn->query($createSql);

    $first   = $_POST['first']   ?? null;
    $last    = $_POST['last']    ?? null;
    $country = $_POST['country'] ?? null;

    $city    = $_POST['city']    ?? null;
    $email   = $_POST['email']   ?? null;
    $age     = isset($_POST['age']) ? (int)$_POST['age'] : null;
    $picture = $_POST['picture'] ?? null;

    $justAdded = false;

    if ($first && $last && $country) {
      //sanatize the input, thanks carson :)
        $stmt = $conn->prepare("
            INSERT INTO `$table` (first, last, country, city, email, age, picture)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->bind_param('sssssis', $first, $last, $country, $city, $email, $age, $picture);
        $stmt->execute();
        $stmt->close();
        $justAdded = true;
    }

    //pull all rows to display
    $rows = [];
    $res = $conn->query("SELECT id, first, last, country, city, email, age, picture, created_at FROM `$table` ORDER BY id DESC");
    while ($r = $res->fetch_assoc()) {
        $rows[] = $r;
    }
    $res->close();
} catch (Throwable $e) {
    http_response_code(500);
    echo "<h1>Database Error</h1>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
    exit;
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Saved Random Users</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./main.css">
</head>
<body>
  <header>
    <h1>Saved Random Users</h1>
    <a class="btn navlink" href="./index.html">← Back to Homepage</a>
  </header>

  <?php if ($justAdded): ?>
    <p class="notice">User <strong><?=htmlspecialchars($first)?> <?=htmlspecialchars($last)?></strong> from <strong><?=htmlspecialchars($country)?></strong> was added.</p>
  <?php else: ?>
    <p class="notice">Submit the form from the homepage to add a user.</p>
  <?php endif; ?>

  <div class="table-wrap">
    <table class="pretty">
      <thead>
        <tr>
          <th>ID</th>
          <th>Photo</th>
          <th>First</th>
          <th>Last</th>
          <th>Country</th>
          <th>City</th>
          <th>Email</th>
          <th>Age</th>
          <th>Added</th>
        </tr>
      </thead>
      <tbody>
        <?php if (empty($rows)): ?>
          <tr><td colspan="9">No users saved yet.</td></tr>
        <?php else: ?>
          <?php foreach ($rows as $r): ?>
            <tr>
              <td><?= (int)$r['id'] ?></td>
              <td>
                <?php if (!empty($r['picture'])): ?>
                  <img class="thumb" src="<?= htmlspecialchars($r['picture']) ?>" alt="photo">
                <?php endif; ?>
              </td>
              <td><?= htmlspecialchars($r['first']) ?></td>
              <td><?= htmlspecialchars($r['last']) ?></td>
              <td><?= htmlspecialchars($r['country']) ?></td>
              <td><?= htmlspecialchars($r['city'] ?? '') ?></td>
              <td><?= htmlspecialchars($r['email'] ?? '') ?></td>
              <td><?= $r['age'] !== null ? (int)$r['age'] : '' ?></td>
              <td><?= htmlspecialchars($r['created_at']) ?></td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</body>
</html>